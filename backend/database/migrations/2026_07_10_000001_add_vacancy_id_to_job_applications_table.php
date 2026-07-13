<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('job_applications', 'vacancy_id')) {
            Schema::table('job_applications', function (Blueprint $table) {
                $table->unsignedBigInteger('vacancy_id')->nullable()->after('applicant_id');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('job_applications', 'vacancy_id')) {
            Schema::table('job_applications', function (Blueprint $table) {
                $table->dropColumn('vacancy_id');
            });
        }
    }
};
