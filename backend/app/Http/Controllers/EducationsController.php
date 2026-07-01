<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Educations;

class EducationsController extends Controller
{

    public function index()
    {

        return response()->json(
            Educations::all()
        );

    }

    public function store(Request $request)
    {

        $info = Educations::create([

            'applicant_id' => $request->applicant_id,

            'nivel_educativo' => $request->nivel_educativo,
            'institucion' => $request->institucion,
            'titulo_obtenido' => $request->titulo_obtenido,
            'cursos' => $request->cursos,

        ]);

        return response()->json($info);

    }

}