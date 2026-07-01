<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('deleted_applicant_histories', function (Blueprint $table) {
            $table->string('email')->nullable()->after('puesto_aplicado');
            $table->string('telefono')->nullable()->after('email');
            $table->string('direccion')->nullable()->after('telefono');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('deleted_applicant_histories', function (Blueprint $table) {
            $table->dropColumn([
                'email',
                'telefono',
                'direccion',
            ]);
        });
    }
};
