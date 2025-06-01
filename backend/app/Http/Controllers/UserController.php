<?php

namespace App\Http\Controllers;

use App\Models\User;
use DB;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the users.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'role_id' => 'required|exists:roles,id',
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:15',
            'email' => 'required|email|unique:users,email',
            'address' => 'nullable|string|max:255',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'password' => 'required|string',
        ]);

        // Handle upload foto
        if ($request->hasFile('photo')) {
            $validatedData['photo'] = $request->file('photo')->store('upload', 'public');
        }

        $validatedData['password'] = bcrypt($validatedData['password']);

        User::create($validatedData);
        return response()->json(['message' => 'User berhasil ditambahkan'], 201);
    }

    /**
     * Display the specified user.
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validatedData = $request->validate([
            'role_id' => 'sometimes|exists:roles,id',
            'name' => 'sometimes|string|max:255',
            'phone' => 'nullable|string|max:15',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'address' => 'nullable|string|max:255',
            'photo' => 'nullable|string|max:255',
            'password' => 'nullable|string',
        ]);

        if (isset($validatedData['password'])) {
            $validatedData['password'] = bcrypt($validatedData['password']);
        }

        $user->update($validatedData);

        return response()->json($user);
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    public function jumlahUser()
    {
        $jumlahUser = DB::table('users')
        ->whereNotNull('name')
        ->count();

        return response()->json([
            'jumlah_user' => $jumlahUser
        ]);
    }

    /**
     * Login user (email & password)
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $credentials['email'])->first();
        if (!$user || !\Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }


        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
        ]);
    }
}
