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
        Schema::create('work_experiences', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('applicant_id');
            $table->text('tiempo_experiencia');
            $table->text('empresa');
            $table->text('puesto');
            $table->text('periodo');
            $table->text('responsabilidades')->nullable();
            $table->text('motivo_salida')->nullable();
            $table->boolean('trabaja_actualmente')->nullable();
            $table->decimal('sueldo_actual', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('work_experiences');
    }
};
