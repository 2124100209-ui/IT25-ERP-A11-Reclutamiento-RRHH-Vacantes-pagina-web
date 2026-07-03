<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('usuarios', 'datos_formulario')) {
            Schema::table('usuarios', function (Blueprint $table) {
                $table->json('datos_formulario')->nullable()->after('fecha_nacimiento');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('usuarios', 'datos_formulario')) {
            Schema::table('usuarios', function (Blueprint $table) {
                $table->dropColumn('datos_formulario');
            });
        }
    }
};
