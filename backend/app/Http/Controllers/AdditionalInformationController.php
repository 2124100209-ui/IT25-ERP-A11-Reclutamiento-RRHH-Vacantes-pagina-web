<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AdditionalInformation;

class AdditionalInformationController extends Controller
{

    public function index()
    {

        return response()->json(
            AdditionalInformation::all()
        );

    }

    public function store(Request $request)
    {

        $info = AdditionalInformation::create([

            'applicant_id' => $request->applicant_id,
            'disponibilidad_horario' => $request->disponibilidad_horario,
            'licencia_conducir' => $request->licencia_conducir,
            'vehiculo_propio' => $request->vehiculo_propio,
            'discapacidad' => $request->discapacidad,
            'tipo_de' => $request->tipo_de,
            'otras_caracteristicas' => $request->otras_caracteristicas

        ]);

        return response()->json($info);

    }

}