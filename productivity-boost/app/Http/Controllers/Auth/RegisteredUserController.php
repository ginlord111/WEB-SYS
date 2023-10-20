<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
// use App\Http\Controllers\Auth\JsonResponse;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'fname' => ['required', 'string', 'max:255'],
            'lname' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:'.User::class],
             'password' => ['required', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'email' => $request->email,
            'password' => Hash::make($request->password), // ETO HASH
        ]);

        event(new Registered($user));

        Auth::login($user);
        return response()->json([
            'user' => $user,
            'token' => $user->createToken('access_token',expiresAt:now()->addDay())->plainTextToken
        ], 200);
        // return response()->noContent();
        // $token = $request->user()->createToken('access_token')->plainTextToken;

        // $response = [
        //     'token' => $token,
        // ];
    
        // return response()->content($response, 200);
    }
}
