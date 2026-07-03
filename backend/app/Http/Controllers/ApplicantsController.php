<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Applicants;
use Illuminate\Support\Facades\Storage;

class ApplicantsController extends Controller
{
    public function index()
    {
        return response()->json(
            Applicants::all()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'curp' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required|string|max:255',
            'direccion' => 'required|string|max:255',
            'fecha_nacimiento' => 'required|string|max:255',
            'estado_civil' => 'required|string|max:255',
            'cv' => 'nullable|file|mimes:pdf,doc,docx|max:20480',
            'carta' => 'nullable|file|mimes:pdf,doc,docx|max:20480',
        ], [
            'email.email' => 'El correo electronico no tiene un formato valido.',
            'cv.mimes' => 'El CV debe ser PDF, DOC o DOCX.',
            'carta.mimes' => 'La carta debe ser PDF, DOC o DOCX.',
            'cv.max' => 'El CV no debe pesar mas de 20 MB.',
            'carta.max' => 'La carta no debe pesar mas de 20 MB.',
        ]);

        $coincidencias = Applicants::where('curp', $request->curp)
            ->orWhere('email', $request->email)
            ->orWhere('telefono', $request->telefono)
            ->get();

        if ($coincidencias->pluck('id')->unique()->count() > 1) {
            return response()->json([
                'message' => 'Los datos pertenecen a diferentes postulantes registrados. Revisa CURP, correo y telefono.',
            ], 422);
        }

        $info = $coincidencias->first();

        $datos = [

            'nombre' => $request->nombre,
            'apellido' => $request->apellido,
            'curp' => $request->curp,
            'email' => $request->email,
            'telefono' => $request->telefono,
            'direccion' => $request->direccion,
            'fecha_nacimiento' => $request->fecha_nacimiento,
            'estado_civil' => $request->estado_civil,
            'credito_infonavit' => $request->boolean('credito_infonavit'),

            // nuevo
            'status' => 'pendiente'

        ];

        if ($info) {
            $info->update($datos);
        } else {
            $info = Applicants::create($datos);
        }

        $documentos = array_merge(
            $this->guardarDocumento($request, $info->id, 'cv'),
            $this->guardarDocumento($request, $info->id, 'carta')
        );

        if (!empty($documentos)) {
            $info->update($documentos);
        }

        return response()->json($info);
    }

    private function guardarDocumento(
        Request $request,
        int $applicantId,
        string $tipo
    ): array {
        if (!$request->hasFile($tipo)) {
            return [];
        }

        $archivo = $request->file($tipo);

        if (!$archivo->isValid()) {
            return [];
        }

        return [
            "{$tipo}_path" => $archivo->store(
                "applicants/{$applicantId}",
                'local'
            ),
            "{$tipo}_original_name" => $archivo->getClientOriginalName(),
        ];
    }

    // obtener por estado
    public function obtenerPorEstado($status)
    {
        return response()->json(
            Applicants::where(
                'status',
                $status
            )->get()
        );
    }

    // cambiar estado
    public function cambiarEstado(
        Request $request,
        $id
    )
    {
        $applicant =
            Applicants::findOrFail($id);

        $applicant->status =
            $request->status;

        $applicant->save();

        return response()->json([
            'message' => 'Estado actualizado'
        ]);
    }
    
}
