<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skills extends Model
{
    protected $table = 'skills';

    protected $fillable = [

        'applicant_id',
        'idiomas',
        'software',
        'habilidades_tecnicas',
        'habilidades_blandas',

    ];
}
