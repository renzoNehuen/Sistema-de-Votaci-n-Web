<?php

namespace App\Http\Controllers;

use App\Models\Voter;
use Illuminate\Http\Request;

class VoterController extends Controller
{
    
    //Listar todos los votantes (incluye candidatos)
    public function index()
    {
        $voters = Voter::all();
        return response()->json($voters, 200);
    }

    //Listar todos los candidatos
    public function listCandidates()
    {
        $candidates = Voter::where('isCandidate', true)->get();
        return response()->json($candidates, 200);
    }

    //Listar todos los candidatos con los votos recibidos en orden de mayor a menor
    public function results()
    {
        $candidates = Voter::where('isCandidate', true)
        ->withCount('receivedVotes')
        ->orderByDesc('received_votes_count')
        ->get();

        return response()->json($candidates, 200);
    }
   
    //Crear Votante
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

   
    //Mostrar votante indicado
    //En caso de ser candidato se muestra tambien la cantidad de votos recibidos
    public function show($id)
    {
        $voter = Voter::find($id);

        if (!$voter) {
            return response()->json(['message' => 'Votante no encontrado'], 404);
        }

        if ($voter->isCandidate){
            $voter->votes_received = $voter->receivedVotes()->count();
        }

        return response()->json($voter, 200);
    }

    
    //Actualizar Votante indicado
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

    //Eliminar Votante indicado
    public function destroy($id)
    {
        $voter = Voter::find($id);

        if (!$voter) {
            return response()->json(['message' => 'Votante no encontrado'], 404);
        }

        if ($voter->votes()->count() > 0 || $voter->receivedVotes()->count() > 0) {
            return response()->json(['message' => 'No se puede eliminar un votante que tiene votos asociados'], 422);
        }

        $voter->delete();

        return response()->json(['message' => 'Votante eliminado exitosamente'], 200);
    }
}
