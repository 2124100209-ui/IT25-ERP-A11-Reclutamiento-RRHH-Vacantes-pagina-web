<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'usuarios';

    protected $fillable = [
        'nombre',
        'apellido',
        'correo',
        'telefono',
        'curp',
        'direccion',
        'fecha_nacimiento',
        'datos_formulario',
        'password',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'datos_formulario' => 'array',
    ];
}
