<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vacancy extends Model
{
    protected $table = 'vacancy';
    
    protected $fillable = [
        'puesto',
        'departamento',
        'descripcion_breve',
        'descripcion',
        'horario',
        'requisitos',
        'salario',
        'img',
        'estado',
    ];
}
