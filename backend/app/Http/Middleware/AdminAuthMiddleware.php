<?php

namespace App\Http\Middleware;

use App\Models\Admin;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminAuthMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->header('X-Admin-Token');

        if (!$token || !Admin::where('session_token', $token)->exists()) {
            return response()->json([
                'message' => 'No autorizado',
            ], 401);
        }

        return $next($request);
    }
}
