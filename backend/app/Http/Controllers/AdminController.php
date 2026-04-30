<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
    
    //Listar todos los Admins
    public function index()
    {
        $admins = Admin::all();
        return response()->json($admins, 200);
    }

    
    //Crear nuevo Admin
    public function store(Request $request)
    {
        $validated = $request->validate([
            'adminId' => 'required|unique:admins|string|max:20',
            'name' => 'required|string|max:100',
            'lastName' => 'required|string|max:100',
            'email' => 'required|email|unique:admins',
            'password' => 'required|string|min:6',
        ]);

        $validated['password'] = bcrypt($validated['password']);

        $admin = Admin::create($validated);

        return response()->json($admin, 201);
    }

    //Imprimir admin indicado
    public function show($id)
    {
        $admin = Admin::find($id);

        if (!$admin) {
            return response()->json(['message' => 'Admin no encontrado'], 404);
        }

        return response()->json($admin, 200);
    }

    //Actualizar Admin indicado
    public function update(Request $request, $id)
    {
        $admin = Admin::find($id);

        if (!$admin) {
            return response()->json(['message' => 'Admin no encontrado'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:100',
            'lastName' => 'sometimes|required|string|max:100',
            'email' => [
                'sometimes',
                'required',
                'email',
                Rule::unique('admins')->ignore($id),
            ],
            'password' => 'sometimes|required|string|min:6',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']);
        }

        $admin->update($validated);

        return response()->json($admin, 200);
    }

    //Eliminar admin indicado
    public function destroy($id)
    {
        $admin = Admin::find($id);

        if (!$admin) {
            return response()->json(['message' => 'Admin no encontrado'], 404);
        }

        $admin->delete();

        return response()->json(['message' => 'Admin eliminado exitosamente'], 200);
    }
}
