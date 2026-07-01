<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdministradorController extends Controller
{
    public function index()
    {

        $datos = DB::table('applicants')

            ->join(
                'job_applications',
                'applicants.id',
                '=',
                'job_applications.applicant_id'
            )

            ->join(
                'educations',
                'applicants.id',
                '=',
                'educations.applicant_id'
            )

            ->join(
                'work_experiences',
                'applicants.id',
                '=',
                'work_experiences.applicant_id'
            )

            ->join(
                'skills',
                'applicants.id',
                '=',
                'skills.applicant_id'
            )

            ->join(
                'additional_information',
                'applicants.id',
                '=',
                'additional_information.applicant_id'
            )

            ->select(

                'applicants.*',

                'job_applications.puesto_aplicado',
                'job_applications.area',

                'educations.nivel_educativo',
                'educations.institucion',
                'educations.titulo_obtenido',
                'educations.cursos',

                'work_experiences.*',

                'skills.idiomas',
                'skills.habilidades_tecnicas',
                'skills.habilidades_blandas',

                'additional_information.*'

            )

            ->get();

        return response()->json($datos);

    }

    public function destroy($id)
{

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

public function update(Request $request, $id)
{
    $vacante = Vacancies::findOrFail($id);

    $vacante->update([

        'puesto' => $request->puesto,
        'descripcion_breve' => $request->descripcion_breve,
        'descripcion' => $request->descripcion,
        'horario' => $request->horario,
        'requisitos' => $request->requisitos,
        'salario' => $request->salario,
        'img' => $request->img,

    ]);

    return response()->json($vacante);
}
}
