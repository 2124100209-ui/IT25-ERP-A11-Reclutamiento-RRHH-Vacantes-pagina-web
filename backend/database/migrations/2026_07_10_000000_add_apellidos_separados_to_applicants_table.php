<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('applicants', 'apellido_paterno')) {
            Schema::table('applicants', function (Blueprint $table) {
                $table->string('apellido_paterno')->nullable()->after('apellido');
            });
        }

        if (!Schema::hasColumn('applicants', 'apellido_materno')) {
            Schema::table('applicants', function (Blueprint $table) {
                $table->string('apellido_materno')->nullable()->after('apellido_paterno');
            });
        }
    }

    public function down(): void
    {
        foreach ([
            'apellido_materno',
            'apellido_paterno',
        ] as $column) {
            if (Schema::hasColumn('applicants', $column)) {
                Schema::table('applicants', function (Blueprint $table) use ($column) {
                    $table->dropColumn($column);
                });
            }
        }
    }
};
