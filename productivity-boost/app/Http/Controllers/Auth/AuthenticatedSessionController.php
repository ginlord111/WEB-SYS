<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\User; 
use App\Http\Controllers\Auth\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Password;

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
        $email = $credentials['email']; // Get the email from the credentials array
        $password = $credentials['password'];

if (!Auth::attempt(['email' => $email, 'password' => $password])) {
    return response()->json([
        'message' => 'User does not exist or credential is incorrect',
        'code' => 422,
        'email' => $email,
        'passowrd' => $password

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

    public function update(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', Rules\Password::defaults()],
        ]);
    
        $email = $request->input('email'); // Retrieve the email from the request
    
        // Find the user by email
        $user = User::where('email', $email)->first();
    
        if (!$user) {
            return response()->json([
                'error' => 'User not found',
            ], 404);
        }
    
        // Update the user's password
        $user->password = Hash::make($request->input('password'));
        $user->save();
    
        return response()->json([
            'success' => 'Password updated successfully',
        ]);
    }

    public function getAllUsers(): JsonResponse
{
    // Retrieve all users from the "users" table
    $users = User::all();

    return response()->json([
        'users' => $users,
    ], 200);
}


public function deleteUser($userID): JsonResponse
{
    $user = User::find($userID);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    // Perform the deletion
    $user->delete();

    return response()->json(['message' => 'User deleted successfully']);
}


}
