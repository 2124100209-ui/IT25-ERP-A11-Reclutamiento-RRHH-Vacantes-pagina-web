<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobApplications extends Model
{
    protected $table = 'job_applications';

    protected $fillable = [

        'applicant_id',
        'vacancy_id',
        'puesto_aplicado',
        'area',
        'sueldo_percibido'

    ];
}
