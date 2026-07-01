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
        Schema::table('applicants', function (Blueprint $table) {
            $table->string('cv_path')->nullable();
            $table->string('cv_original_name')->nullable();
            $table->string('carta_path')->nullable();
            $table->string('carta_original_name')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('applicants', function (Blueprint $table) {
            $table->dropColumn([
                'cv_path',
                'cv_original_name',
                'carta_path',
                'carta_original_name',
            ]);
        });
    }
};
