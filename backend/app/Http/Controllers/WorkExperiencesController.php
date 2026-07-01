<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WorkExperiences;

class WorkExperiencesController extends Controller
{
    private function normalizarDecimal($valor)
    {
        if ($valor === null || trim((string) $valor) === '') {
            return null;
        }

        $normalizado = str_replace(
            ',',
            '',
            preg_replace('/[^\d.,]/', '', $valor)
        );

        return $normalizado === ''
            ? null
            : $normalizado;
    }

    public function index()
    {

        return response()->json(
            WorkExperiences::all()
        );

    }

    public function store(Request $request)
    {

        $info = WorkExperiences::create([

            'applicant_id' => $request->applicant_id,

            'tiempo_experiencia' => $request->tiempo_experiencia,
            'empresa' => $request->empresa,
            'puesto' => $request->puesto,
            'periodo' => $request->periodo,
            'responsabilidades' => $request->responsabilidades,
            'motivo_salida' => $request->motivo_salida,
            'trabaja_actualmente' => $request->trabaja_actualmente,
            'sueldo_actual' => $this->normalizarDecimal(
                $request->sueldo_actual
            ),

        ]);

        return response()->json($info);

    }

}
