<?php


use App\Http\Controllers\AdditionalInformationController;

Route::get(
    '/additional-information',
    [AdditionalInformationController::class, 'index']
);

Route::post(
    '/additional-information',
    [AdditionalInformationController::class, 'store']
);



use App\Http\Controllers\SeguimientoController;
use App\Http\Controllers\ApplicantsController;

Route::get(
    '/applicants',
    [ApplicantsController::class, 'index']
)->middleware('admin.auth');

// guardar formulario
Route::post(
    '/applicants',
    [ApplicantsController::class, 'store']
);

// seguimiento general
Route::get(
    '/seguimiento',
    [SeguimientoController::class, 'index']
)->middleware('admin.auth');

Route::get(
    '/seguimiento/historial-bajas',
    [SeguimientoController::class, 'historialBajas']
)->middleware('admin.auth');

Route::get(
    '/seguimiento/{id}/documento/{tipo}',
    [SeguimientoController::class, 'descargarDocumento']
)->middleware('admin.auth');

// filtrar por estado
Route::get(
    '/seguimiento/estado/{status}',
    [SeguimientoController::class, 'obtenerPorEstado']
)->middleware('admin.auth');

// cambiar estado
Route::put(
    '/seguimiento/{id}/status',
    [SeguimientoController::class, 'cambiarEstado']
)->middleware('admin.auth');

Route::delete(
    '/seguimiento/{id}',
    [SeguimientoController::class, 'destroy']
)->middleware('admin.auth');

use App\Http\Controllers\EducationsController;

Route::get(
    '/educations',
    [EducationsController::class, 'index']
)->middleware('admin.auth');

Route::post(
    '/educations',
    [EducationsController::class, 'store']
);


use App\Http\Controllers\JobApplicationsController;

Route::get(
    '/job-applications',
    [JobApplicationsController::class, 'index']
)->middleware('admin.auth');

Route::post(
    '/job-applications',
    [JobApplicationsController::class, 'store']
);


use App\Http\Controllers\WorkExperiencesController;

Route::get(
    '/work-experiences',
    [WorkExperiencesController::class, 'index']
)->middleware('admin.auth');

Route::post(
    '/work-experiences',
    [WorkExperiencesController::class, 'store']
);


use App\Http\Controllers\SkillsController;

Route::get(
    '/skills',
    [SkillsController::class, 'index']
)->middleware('admin.auth');

Route::post(
    '/skills',
    [SkillsController::class, 'store']
);


use App\Http\Controllers\AdministradorController;
use App\Http\Controllers\AdminAuthController;

Route::post(
    '/admin-login',
    [AdminAuthController::class, 'login']
);

Route::get(
    '/admin-users',
    [AdminAuthController::class, 'index']
)->middleware('admin.auth');

Route::post(
    '/admin-users',
    [AdminAuthController::class, 'store']
)->middleware('admin.auth');

Route::get(
    '/administrador',
    [AdministradorController::class, 'index']
)->middleware('admin.auth');



use App\Http\Controllers\VacancyController;
Route::get(
    '/vacancy',
    [VacancyController::class, 'index']
);
Route::get(
    '/vacancy/{id}',
    [VacancyController::class, 'show']
);
Route::get(
    '/vacancy/{id}/imagen',
    [VacancyController::class, 'imagen']
);
Route::post(
    '/vacancy-admin',
    [VacancyController::class, 'store']
)->middleware('admin.auth');

Route::put(
    '/vacancy-admin/{id}',
    [VacancyController::class, 'update']
)->middleware('admin.auth');

Route::delete(
    '/vacancy-admin/{id}',
    [VacancyController::class, 'destroy']
)->middleware('admin.auth');
Route::put(
    '/vacancy-admin/{id}/estado',
    [VacancyController::class, 'cambiarEstado']
)->middleware('admin.auth');
Route::get(
    '/vacancy-admin',
    [VacancyController::class, 'adminIndex']
)->middleware('admin.auth');



use App\Http\Controllers\UsuarioController;
Route::get(
    '/usuario',
    [UsuarioController::class, 'index']
);
Route::post(
    '/usuario',
    [UsuarioController::class, 'store']
);
