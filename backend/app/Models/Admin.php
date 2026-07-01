<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $table = 'admins';

    protected $fillable = [
        'correo',
        'password',
        'session_token',
    ];

    protected $hidden = [
        'password',
        'session_token',
    ];
}
