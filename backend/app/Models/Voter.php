<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voter extends Model
{
    protected $table = 'voters';
    protected $fillable = [
        'id',
        'document',
        'name',
        'lastName',
        'dob',
        'isCandidate'
    ];

    protected $casts = [
        'isCandidate' => 'boolean',
        'dob' => 'date',
    ];
    

    public function votes()
    {
        return $this->hasMany(Vote::class, 'voter_id');
    }

    public function receivedVotes()
    {
        return $this->hasMany(Vote::class, 'candidate_id');
    }

}
