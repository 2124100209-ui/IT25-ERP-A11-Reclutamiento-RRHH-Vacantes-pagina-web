<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'usuarios';

    protected $fillable = [
        'puesto',
        'descripcion_breve',
        'descripcion',
        'horario',
        'requisitos',
        'salario',
        'img',
    ];
}