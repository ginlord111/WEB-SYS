<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\User; 
use App\Http\Controllers\Auth\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        // $request->authenticate();

        // $request->session()->regenerate();
        $credentials = $request->validated();
        if(!Auth::attempt($credentials)){
            return response()->json ([
                'message' => 'Provided email address or password is incorrect',
                'code' => 422
            ]);
        }
    /**@var User $user*/
        $user = Auth::user();
        $token = $user->createToken('access_token',expiresAt:now()->addDay())->plainTextToken;
        return response()->json([
            'user' => $user,
            'token' => $user->createToken('access_token',expiresAt:now()->addDay())->plainTextToken
        ], 200);
        


        // return response()->noContent();
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request):JsonResponse
    {
        Auth::guard('web')->logout();

        // $request->session()->invalidate();

        // $request->session()->regenerateToken();
        // $user = $request->user();
        // $user->currentAccessToken()->delete();
       return response()->json([
        'SUCCES'=>'SUCCESS'
       ]);

        // return response()->noContent();
    }
}
