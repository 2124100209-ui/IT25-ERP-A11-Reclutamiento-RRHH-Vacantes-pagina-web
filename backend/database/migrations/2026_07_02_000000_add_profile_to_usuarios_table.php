<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('usuarios', 'apellido')) {
            Schema::table('usuarios', function (Blueprint $table) {
                $table->string('apellido')->nullable()->after('nombre');
            });
        }

        if (!Schema::hasColumn('usuarios', 'password')) {
            Schema::table('usuarios', function (Blueprint $table) {
                $table->string('password')->nullable()->after('correo');
            });
        }

        if (!Schema::hasColumn('usuarios', 'telefono')) {
            Schema::table('usuarios', function (Blueprint $table) {
                $table->string('telefono')->nullable()->after('password');
            });
        }

        if (!Schema::hasColumn('usuarios', 'curp')) {
            Schema::table('usuarios', function (Blueprint $table) {
                $table->string('curp')->nullable()->after('telefono');
            });
        }

        if (!Schema::hasColumn('usuarios', 'direccion')) {
            Schema::table('usuarios', function (Blueprint $table) {
                $table->string('direccion')->nullable()->after('curp');
            });
        }

        if (!Schema::hasColumn('usuarios', 'fecha_nacimiento')) {
            Schema::table('usuarios', function (Blueprint $table) {
                $table->string('fecha_nacimiento')->nullable()->after('direccion');
            });
        }
    }

    public function down(): void
    {
        foreach ([
            'apellido',
            'password',
            'telefono',
            'curp',
            'direccion',
            'fecha_nacimiento',
        ] as $column) {
            if (Schema::hasColumn('usuarios', $column)) {
                Schema::table('usuarios', function (Blueprint $table) use ($column) {
                    $table->dropColumn($column);
                });
            }
        }
    }
};
