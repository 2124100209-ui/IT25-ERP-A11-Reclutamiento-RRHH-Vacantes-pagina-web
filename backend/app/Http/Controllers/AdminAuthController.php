<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'correo' => 'required|email',
            'password' => 'required|string',
        ]);

        $admin = Admin::where('correo', $request->correo)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json([
                'message' => 'Correo o contrasena incorrectos',
            ], 401);
        }

        $token = Str::random(60);
        $admin->update([
            'session_token' => $token,
        ]);

        return response()->json([
            'message' => 'Sesion iniciada',
            'admin' => $admin,
            'token' => $token,
        ]);
    }

    public function index()
    {
        return response()->json(
            Admin::orderBy('id', 'desc')->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'correo' => 'required|email|unique:admins,correo',
            'password' => 'required|string|min:6',
        ]);

        $admin = Admin::create([
            'correo' => $request->correo,
            'password' => Hash::make($request->password),
        ]);

        return response()->json($admin, 201);
    }
}
