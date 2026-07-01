<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobApplications;

class JobApplicationsController extends Controller
{

    public function index()
    {

        return response()->json(
            JobApplications::all()
        );

    }

    public function store(Request $request)
    {

        $info = jobApplications::create([

            'applicant_id' => $request->applicant_id,

            'puesto_aplicado' => $request->puesto_aplicado,
            'area' => $request->area,
            'sueldo_percibido' => $request->sueldo_percibido

        ]);

        return response()->json($info);

    }

}