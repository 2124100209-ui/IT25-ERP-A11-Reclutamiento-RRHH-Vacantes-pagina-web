<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;


class SeguimientoController extends Controller
{
    private const HORAS_HISTORIAL_BAJAS = 24;

    private function consultaPostulantes()
    {
        return DB::table('applicants')

            ->leftJoin(
                'job_applications',
                'applicants.id',
                '=',
                'job_applications.applicant_id'
            )

            ->leftJoin(
                'educations',
                'applicants.id',
                '=',
                'educations.applicant_id'
            )

            ->leftJoin(
                'work_experiences',
                'applicants.id',
                '=',
                'work_experiences.applicant_id'
            )

            ->leftJoin(
                'skills',
                'applicants.id',
                '=',
                'skills.applicant_id'
            )

            ->leftJoin(
                'additional_information',
                'applicants.id',
                '=',
                'additional_information.applicant_id'
            )

            ->select(
                'applicants.id',
                'applicants.nombre',
                'applicants.apellido',
                'applicants.curp',
                'applicants.email',
                'applicants.telefono',
                'applicants.direccion',
                'applicants.fecha_nacimiento',
                'applicants.estado_civil',
                'applicants.credito_infonavit',
                'applicants.status',
                'applicants.cv_path',
                'applicants.cv_original_name',
                'applicants.carta_path',
                'applicants.carta_original_name',
                'applicants.created_at as applicant_created_at',
                'applicants.updated_at as applicant_updated_at',
                'job_applications.puesto_aplicado',
                'job_applications.area',
                'job_applications.sueldo_percibido',
                'educations.nivel_educativo',
                'educations.institucion',
                'educations.titulo_obtenido',
                'educations.cursos',
                'work_experiences.id as work_experience_id',
                'work_experiences.tiempo_experiencia',
                'work_experiences.empresa',
                'work_experiences.puesto',
                'work_experiences.periodo',
                'work_experiences.responsabilidades',
                'work_experiences.motivo_salida',
                'work_experiences.trabaja_actualmente',
                'work_experiences.sueldo_actual',
                'skills.idiomas',
                'skills.software',
                'skills.habilidades_tecnicas',
                'skills.habilidades_blandas',
                'additional_information.disponibilidad_horario',
                'additional_information.licencia_conducir',
                'additional_information.vehiculo_propio',
                'additional_information.discapacidad',
                'additional_information.tipo_de',
                'additional_information.otras_caracteristicas'
            );
    }

    private function formatearPostulantes($datos)
    {
        $postulantes = [];

        foreach ($datos as $fila) {
            $id = $fila->id;

            if (!isset($postulantes[$id])) {
                $postulante = (array) $fila;
                $postulante['work_experiences'] = [];
                $postulante['_work_experience_ids'] = [];

                $postulantes[$id] = $postulante;
            }

            if ($fila->work_experience_id) {
                $experienceId = $fila->work_experience_id;

                if (!in_array(
                    $experienceId,
                    $postulantes[$id]['_work_experience_ids'],
                    true
                )) {
                    $postulantes[$id]['_work_experience_ids'][] =
                        $experienceId;

                    $postulantes[$id]['work_experiences'][] = [
                        'id' => $experienceId,
                        'tiempo_experiencia' => $fila->tiempo_experiencia,
                        'empresa' => $fila->empresa,
                        'puesto' => $fila->puesto,
                        'periodo' => $fila->periodo,
                        'responsabilidades' => $fila->responsabilidades,
                        'motivo_salida' => $fila->motivo_salida,
                        'trabaja_actualmente' => $fila->trabaja_actualmente,
                        'sueldo_actual' => $fila->sueldo_actual,
                    ];
                }
            }
        }

        return array_map(function ($postulante) {
            unset($postulante['_work_experience_ids']);

            return $postulante;
        }, array_values($postulantes));
    }

    private function limpiarHistorialBajas()
    {
        DB::table('deleted_applicant_histories')
            ->where(
                'deleted_at',
                '<',
                now()->subHours(self::HORAS_HISTORIAL_BAJAS)
            )
            ->delete();
    }

    private function guardarHistorialBaja($id)
    {
        $this->limpiarHistorialBajas();

        $postulante = DB::table('applicants')
            ->leftJoin(
                'job_applications',
                'applicants.id',
                '=',
                'job_applications.applicant_id'
            )
            ->where('applicants.id', $id)
            ->select(
                'applicants.id',
                'applicants.nombre',
                'applicants.apellido',
                'applicants.email',
                'applicants.telefono',
                'applicants.direccion',
                'job_applications.puesto_aplicado'
            )
            ->first();

        if (!$postulante) {
            return;
        }

        DB::table('deleted_applicant_histories')->insert([
            'applicant_id' => $postulante->id,
            'nombre' => trim(
                $postulante->nombre . ' ' . $postulante->apellido
            ),
            'puesto_aplicado' => $postulante->puesto_aplicado,
            'email' => $postulante->email,
            'telefono' => $postulante->telefono,
            'direccion' => $postulante->direccion,
            'deleted_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function index()
    {

        $datos = $this->consultaPostulantes()
            ->where(
                'applicants.status',
                'pendiente'
            )
            ->get();

        return response()->json(
            $this->formatearPostulantes($datos)
        );

    }

public function destroy($id)
{
    $this->guardarHistorialBaja($id);

    $applicant = DB::table('applicants')
        ->where('id', $id)
        ->first();

    if ($applicant) {
        foreach ([$applicant->cv_path, $applicant->carta_path] as $path) {
            if ($path && Storage::disk('local')->exists($path)) {
                Storage::disk('local')->delete($path);
            }
        }
    }

    DB::table('educations')
        ->where('applicant_id', $id)
        ->delete();

    DB::table('skills')
        ->where('applicant_id', $id)
        ->delete();

    DB::table('work_experiences')
        ->where('applicant_id', $id)
        ->delete();

    DB::table('job_applications')
        ->where('applicant_id', $id)
        ->delete();

    DB::table('additional_information')
        ->where('applicant_id', $id)
        ->delete();

    DB::table('applicants')
        ->where('id', $id)
        ->delete();

    return response()->json([
        'mensaje' => 'Eliminado'
    ]);

}

public function seguimiento()
{
    return Applicants::where(
        'status',
        'pendiente'
    )->get();
}
public function porEstado($status)
{
    return Applicants::where(
        'status',
        $status
    )->get();
}


public function obtenerPorEstado($status)
{
    $consulta = $this->consultaPostulantes();

    if ($status === 'aceptado') {
        $consulta->whereIn(
            'applicants.status',
            ['aceptado', 'prefiltro']
        );
    } else {
        $consulta->where(
            'applicants.status',
            $status
        );
    }

    $datos = $consulta->get();

    return response()->json(
        $this->formatearPostulantes($datos)
    );
}

public function historialBajas()
{
    $this->limpiarHistorialBajas();

    return response()->json(
        DB::table('deleted_applicant_histories')
            ->orderBy('deleted_at', 'desc')
            ->get()
    );
}


public function cambiarEstado(Request $request, $id)
{
    DB::table('applicants')
        ->where('id', $id)
        ->update([
            'status' => $request->status
        ]);

    return response()->json([
        'mensaje' => 'Estado actualizado'
    ]);
}

public function descargarDocumento($id, $tipo)
{
    if (!in_array($tipo, ['cv', 'carta'], true)) {
        abort(404);
    }

    $applicant = DB::table('applicants')
        ->where('id', $id)
        ->first();

    if (!$applicant) {
        abort(404);
    }

    $path = $tipo === 'cv'
        ? $applicant->cv_path
        : $applicant->carta_path;

    $originalName = $tipo === 'cv'
        ? $applicant->cv_original_name
        : $applicant->carta_original_name;

    if (!$path || !Storage::disk('local')->exists($path)) {
        abort(404);
    }

    return Storage::disk('local')->download(
        $path,
        $originalName ?: basename($path)
    );
}
}
