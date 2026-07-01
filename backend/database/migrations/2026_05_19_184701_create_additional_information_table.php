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
        Schema::create('additional_information', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('applicant_id');
            $table->string('disponibilidad_horario')->nullable();
            $table->boolean('licencia_conducir')->nullable();
            $table->boolean('vehiculo_propio')->nullable();
            $table->boolean('discapacidad')->nullable();
            $table->string('tipo_de')->nullable();
            $table->string('otras_caracteristicas')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('additional_information');
    }
};
