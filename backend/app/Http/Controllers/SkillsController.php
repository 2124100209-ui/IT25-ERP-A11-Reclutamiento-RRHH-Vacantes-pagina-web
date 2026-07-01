<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Skills;

class SkillsController extends Controller
{
    public function index()
    {

        return response()->json(
            Skills::all()
        );

    }

    public function store(Request $request)
    {

        $info = Skills::create([

            'applicant_id' => $request->applicant_id,

            'idiomas' => $request->idiomas,
            'software' => $request->software,
            'habilidades_tecnicas' => $request->habilidades_tecnicas,
            'habilidades_blandas' => $request->habilidades_blandas,

        ]);

        return response()->json($info);

    }
}
