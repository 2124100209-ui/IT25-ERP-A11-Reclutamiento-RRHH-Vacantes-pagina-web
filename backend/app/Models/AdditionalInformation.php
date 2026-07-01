<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdditionalInformation extends Model
{

    protected $table = 'additional_information';

    protected $fillable = [

        'applicant_id',
        'disponibilidad_horario',
        'licencia_conducir',
        'vehiculo_propio',
        'discapacidad',
        'tipo_de',
        'otras_caracteristicas'

    ];

}