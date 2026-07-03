<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{

    public function index()
    {
        return response()->json(
            Usuario::all()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'correo' => 'required|email|unique:usuarios,correo',
            'password' => 'required|string|min:6',
            'telefono' => 'required|string|max:255|unique:usuarios,telefono',
            'curp' => 'required|string|max:255|unique:usuarios,curp',
            'direccion' => 'required|string|max:255',
            'fecha_nacimiento' => 'required|string|max:255',
            'datos_formulario' => 'nullable|array',
        ]);

        $usuario = Usuario::create([
            'nombre' => $request->nombre,
            'apellido' => $request->apellido,
            'correo' => $request->correo,
            'password' => Hash::make($request->password),
            'telefono' => $request->telefono,
            'curp' => $request->curp,
            'direccion' => $request->direccion,
            'fecha_nacimiento' => $request->fecha_nacimiento,
            'datos_formulario' => $request->datos_formulario,
        ]);

        return response()->json($usuario, 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'correo' => 'required|email',
            'password' => 'required|string',
        ]);

        $usuario = Usuario::where('correo', $request->correo)->first();

        if (!$usuario || !Hash::check($request->password, $usuario->password)) {
            return response()->json([
                'message' => 'Correo o contrasena incorrectos',
            ], 401);
        }

        return response()->json([
            'message' => 'Sesion iniciada',
            'usuario' => $usuario,
        ]);
    }

}
