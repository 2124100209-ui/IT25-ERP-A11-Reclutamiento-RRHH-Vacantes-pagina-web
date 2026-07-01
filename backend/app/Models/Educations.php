<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Educations extends Model
{
    protected $table = 'educations';

    protected $fillable = [

        'applicant_id',
        'nivel_educativo',
        'institucion',
        'titulo_obtenido',
        'cursos',

    ];
}
