<?php

namespace App\Http\Controllers;

use App\Models\Vote;
use App\Models\Voter;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class VoteController extends Controller
{
    
    //Listar todos los votos
    public function index()
    {
        $votes = Vote::with(['voter', 'candidate'])->get();
        return response()->json($votes, 200);
    }

   
    //Crear Voto
    //Un votante no puede votarse a si mismo ni puede emitir un unico voto y a un unico candidato
    public function store(Request $request)
    {
        $validated = $request->validate([
            'voter' => 'required|integer|exists:voters,id',
            'voterVoted' => 'required|integer|exists:voters,id|different:voter',
            'date' => 'nullable|date',
        ]);

        //Verificar que el votante existe y si es candidato no se vote a si mismo
        $voter = Voter::find($validated['voter']);
        $candidate = Voter::find($validated['voterVoted']);

        if (!$voter || !$candidate) {
            return response()->json(['message' => 'Votante o candidato no encontrado'], 404);
        }

        if (!$candidate->isCandidate) {
            return response()->json(['message' => 'El destinatario no es un candidato válido'], 422);
        }

        //Verificar si el votante ya emitio un voto con anterioridad
        $existingVote = Vote::where('voter', $validated['voter'])->exists();

        if ($existingVote) {
            return response()->json(['message' => 'Usted ya emitio un voto anteriormente'], 422);
        }

        $validated['date'] = $validated['date'] ?? now();
        $validated['voteId'] = Str::uuid()->toString();

        $vote = Vote::create($validated);

        return response()->json($vote, 201);
    }

   
    //Imprimir el voto indicado
    public function show($id)
    {
        $vote = Vote::with(['voter', 'candidate'])->find($id);

        if (!$vote) {
            return response()->json(['message' => 'Voto no encontrado'], 404);
        }

        return response()->json($vote, 200);
    }

    
    //Actualizar el voto indicado
    public function update(Request $request, $id)
    {
        $vote = Vote::find($id);

        if (!$vote) {
            return response()->json(['message' => 'Voto no encontrado'], 404);
        }

        $validated = $request->validate([
            'voter' => 'sometimes|required|integer|exists:voters,id',
            'voterVoted' => 'sometimes|required|integer|exists:voters,id',
            'date' => 'sometimes|date',
        ]);

        if (isset($validated['voterVoted'])) {
            $candidate = Voter::find($validated['voterVoted']);
            if (!$candidate || !$candidate->isCandidate) {
                return response()->json(['message' => 'El destinatario no es un candidato válido'], 422);
            }
        }

        $vote->update($validated);

        return response()->json($vote, 200);
    }

    //Elimitar el voto indicado
    public function destroy($id)
    {
        $vote = Vote::find($id);

        if (!$vote) {
            return response()->json(['message' => 'Voto no encontrado'], 404);
        }

        $vote->delete();

        return response()->json(['message' => 'Voto eliminado exitosamente'], 200);
    }
}
