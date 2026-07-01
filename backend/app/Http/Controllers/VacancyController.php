<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vacancy;
use Illuminate\Support\Facades\Storage;

class VacancyController extends Controller
{
    public function index()
{
    // usuario
    return response()->json(
        Vacancy::where('estado', true)
            ->get()
            ->map(fn ($vacante) => $this->agregarUrlImagen($vacante))
    );
}

public function adminIndex()
{
    // admin
    return response()->json(
        Vacancy::all()
            ->map(fn ($vacante) => $this->agregarUrlImagen($vacante))
    );
}

public function show($id)
{
    $vacante = Vacancy::where('estado', true)
        ->where('id', $id)
        ->firstOrFail();

    return response()->json(
        $this->agregarUrlImagen($vacante)
    );
}

    public function store(Request $request)
    {
        $request->validate([
            'img' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $info = Vacancy::create([

            'puesto' => $request->puesto,
            'departamento' => $request->departamento,
            'descripcion_breve' => $request->descripcion_breve,
            'descripcion' => $request->descripcion,
            'horario' => $request->horario,
            'requisitos' => $request->requisitos,
            'salario' => $request->salario,
            'img' => $request
                ->file('img')
                ->store('vacancy', 'public'),
        ]);

        return response()->json(
            $this->agregarUrlImagen($info)
        );

    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'img' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $vacante = Vacancy::findOrFail($id);

        $datos = [
            'puesto' => $request->puesto,
            'departamento' => $request->departamento,
            'descripcion_breve' => $request->descripcion_breve,
            'descripcion' => $request->descripcion,
            'horario' => $request->horario,
            'requisitos' => $request->requisitos,
            'salario' => $request->salario,
        ];

        if ($request->hasFile('img')) {
            if ($vacante->img && Storage::disk('public')->exists($vacante->img)) {
                Storage::disk('public')->delete($vacante->img);
            }

            $datos['img'] = $request
                ->file('img')
                ->store('vacancy', 'public');
        }
            
        $vacante->update($datos);

        return response()->json(
            $this->agregarUrlImagen($vacante)
        );
    }

    public function destroy($id) {

    $vacante = Vacancy::findOrFail($id);

    if ($vacante->img && Storage::disk('public')->exists($vacante->img)) {
        Storage::disk('public')->delete($vacante->img);
    }

    $vacante -> delete();
    return response()->json([
        'message' => 'Vacante eliminada'
    ]);

    }

    public function cambiarEstado($id)
{
    $vacante = Vacancy::findOrFail($id);

    $vacante->estado =
        !$vacante->estado;

    $vacante->save();

    return response()->json([
        'message' => 'Estado actualizado',
        'estado' => $vacante->estado
    ]);
}

public function imagen($id)
{
    $vacante = Vacancy::findOrFail($id);

    if (filter_var($vacante->img, FILTER_VALIDATE_URL)) {
        return redirect($vacante->img);
    }

    if (!$vacante->img || !Storage::disk('public')->exists($vacante->img)) {
        abort(404);
    }

    return response()->file(
        Storage::disk('public')->path($vacante->img)
    );
}

private function agregarUrlImagen(Vacancy $vacante)
{
    if (!$vacante->img) {
        $vacante->img_url = null;

        return $vacante;
    }

    $vacante->img_url = filter_var($vacante->img, FILTER_VALIDATE_URL)
        ? $vacante->img
        : url("/api/vacancy/{$vacante->id}/imagen");

    return $vacante;
}

}
