<?php

namespace App\Http\Controllers;

use App\Models\Voter;
use Illuminate\Http\Request;

class VoterController extends Controller
{
    /**
     * Display a listing of voters.
     */
    public function index()
    {
        $voters = Voter::all();
        return response()->json($voters, 200);
    }

    /**
     * Store a newly created voter in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'document' => 'required|unique:voters|string|max:20',
            'name' => 'required|string|max:100',
            'lastName' => 'required|string|max:100',
            'dob' => 'required|date|before:today',
            'isCandidate' => 'boolean',
        ]);

        $validated['isCandidate'] = $validated['isCandidate'] ?? false;

        $voter = Voter::create($validated);

        return response()->json($voter, 201);
    }

    /**
     * Display the specified voter.
     */
    public function show($id)
    {
        $voter = Voter::find($id);

        if (!$voter) {
            return response()->json(['message' => 'Votante no encontrado'], 404);
        }

        return response()->json($voter, 200);
    }

    /**
     * Update the specified voter in storage.
     */
    public function update(Request $request, $id)
    {
        $voter = Voter::find($id);

        if (!$voter) {
            return response()->json(['message' => 'Votante no encontrado'], 404);
        }

        $validated = $request->validate([
            'document' => 'sometimes|required|unique:voters,document,' . $id,
            'name' => 'sometimes|required|string|max:100',
            'lastName' => 'sometimes|required|string|max:100',
            'dob' => 'sometimes|required|date|before:today',
            'isCandidate' => 'sometimes|boolean',
        ]);

        $voter->update($validated);

        return response()->json($voter, 200);
    }

    /**
     * Remove the specified voter from storage.
     */
    public function destroy($id)
    {
        $voter = Voter::find($id);

        if (!$voter) {
            return response()->json(['message' => 'Votante no encontrado'], 404);
        }

        // Check if voter has votes
        if ($voter->votes()->count() > 0 || $voter->receivedVotes()->count() > 0) {
            return response()->json(['message' => 'No se puede eliminar un votante que tiene votos asociados'], 422);
        }

        $voter->delete();

        return response()->json(['message' => 'Votante eliminado exitosamente'], 200);
    }
}
