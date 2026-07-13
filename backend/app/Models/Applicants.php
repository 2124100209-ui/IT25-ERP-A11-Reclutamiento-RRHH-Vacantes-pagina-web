<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Applicants extends Model
{
    protected $table = 'applicants';

    protected $fillable = [

        'nombre',
        'apellido',
        'apellido_paterno',
        'apellido_materno',
        'curp',
        'email',
        'telefono',
        'direccion',
        'fecha_nacimiento',
        'estado_civil',
        'credito_infonavit',
        'status',
        'cv_path',
        'cv_original_name',
        'carta_path',
        'carta_original_name'

    ];
}
