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
            'cv' => 'nullable|file|mimes:pdf,doc,docx|max:20480',
            'carta' => 'nullable|file|mimes:pdf,doc,docx|max:20480',
        ]);

        $info = Applicants::create([

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

        ]);

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
