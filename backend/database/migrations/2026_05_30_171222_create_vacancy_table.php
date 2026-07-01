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
        Schema::create('vacancy', function (Blueprint $table) {
            $table->id();
            $table->string('puesto');
            $table->string('descripcion_breve');
            $table->text('descripcion');
            $table->string('horario');
            $table->text('requisitos');
            $table->string('salario');
            $table->string('img');
            $table->boolean('estado')
              ->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacancy');
    }
};
