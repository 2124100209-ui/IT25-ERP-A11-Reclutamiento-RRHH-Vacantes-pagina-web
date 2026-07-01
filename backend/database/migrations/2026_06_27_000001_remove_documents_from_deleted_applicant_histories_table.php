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
            $table->dropColumn([
                'cv_original_name',
                'carta_original_name',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('deleted_applicant_histories', function (Blueprint $table) {
            $table->string('cv_original_name')->nullable();
            $table->string('carta_original_name')->nullable();
        });
    }
};
