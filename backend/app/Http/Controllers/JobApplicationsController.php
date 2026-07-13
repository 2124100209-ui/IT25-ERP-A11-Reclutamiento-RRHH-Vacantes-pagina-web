<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobApplications;
use Illuminate\Support\Facades\Schema;

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
        $request->validate([
            'applicant_id' => 'required|integer',
            'vacancy_id' => 'nullable|integer',
            'puesto_aplicado' => 'required|string|max:255',
            'area' => 'required|string|max:255',
            'sueldo_percibido' => 'nullable|string|max:255',
        ]);

        $existe = JobApplications::where(
            'applicant_id',
            $request->applicant_id
        );

        if (
            $request->vacancy_id
            && Schema::hasColumn('job_applications', 'vacancy_id')
        ) {
            $existe->where('vacancy_id', $request->vacancy_id);
        } else {
            $existe
                ->where('puesto_aplicado', $request->puesto_aplicado)
                ->where('area', $request->area);
        }

        if ($existe->exists()) {
            return response()->json([
                'message' => 'Este usuario ya se postulo a esta vacante.',
            ], 422);
        }

        $datos = [

            'applicant_id' => $request->applicant_id,
            'puesto_aplicado' => $request->puesto_aplicado,
            'area' => $request->area,
            'sueldo_percibido' => $request->sueldo_percibido

        ];

        if (Schema::hasColumn('job_applications', 'vacancy_id')) {
            $datos['vacancy_id'] = $request->vacancy_id;
        }

        $info = JobApplications::create($datos);

        return response()->json($info);

    }

}
