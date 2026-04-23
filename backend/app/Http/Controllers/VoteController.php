<?php

namespace App\Http\Controllers;

use App\Models\Vote;
use App\Models\Voter;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    /**
     * Display a listing of votes.
     */
    public function index()
    {
        $votes = Vote::with(['voter', 'candidate'])->get();
        return response()->json($votes, 200);
    }

    /**
     * Store a newly created vote in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'voter' => 'required|integer|exists:voters,id',
            'voterVoted' => 'required|integer|exists:voters,id|different:voter',
            'date' => 'nullable|date',
        ]);

        // Verify voter exists and is not a candidate voting for themselves
        $voter = Voter::find($validated['voter']);
        $candidate = Voter::find($validated['voterVoted']);

        if (!$voter || !$candidate) {
            return response()->json(['message' => 'Votante o candidato no encontrado'], 404);
        }

        if (!$candidate->isCandidate) {
            return response()->json(['message' => 'El destinatario no es un candidato válido'], 422);
        }

        // Check if voter already voted for this candidate
        $existingVote = Vote::where('voter', $validated['voter'])
            ->where('voterVoted', $validated['voterVoted'])
            ->first();

        if ($existingVote) {
            return response()->json(['message' => 'Este votante ya ha votado por este candidato'], 422);
        }

        $validated['date'] = $validated['date'] ?? now();

        $vote = Vote::create($validated);

        return response()->json($vote, 201);
    }

    /**
     * Display the specified vote.
     */
    public function show($id)
    {
        $vote = Vote::with(['voter', 'candidate'])->find($id);

        if (!$vote) {
            return response()->json(['message' => 'Voto no encontrado'], 404);
        }

        return response()->json($vote, 200);
    }

    /**
     * Update the specified vote in storage.
     */
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

    /**
     * Remove the specified vote from storage.
     */
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
