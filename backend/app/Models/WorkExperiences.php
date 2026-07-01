<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkExperiences extends Model
{
    protected $table = 'work_experiences';

    protected $fillable = [

        'applicant_id',
        'tiempo_experiencia',
        'empresa',
        'puesto',
        'periodo',
        'responsabilidades',
        'motivo_salida',
        'trabaja_actualmente',
        'sueldo_actual',

    ];
}
