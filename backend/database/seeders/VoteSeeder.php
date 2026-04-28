<?php

namespace Database\Seeders;

use App\Models\Vote;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pedro vota por Ana
        Vote::create([
            'voteId' => 'VOTE001',
            'voter' => 4, // Pedro
            'voterVoted' => 1, // Ana
            'date' => now(),
        ]);

        // Laura vota por Ana
        Vote::create([
            'voteId' => 'VOTE002',
            'voter' => 5, // Laura
            'voterVoted' => 1, // Ana
            'date' => now(),
        ]);

        // Miguel vota por Luis
        Vote::create([
            'voteId' => 'VOTE003',
            'voter' => 6, // Miguel
            'voterVoted' => 2, // Luis
            'date' => now(),
        ]);

        // Isabel vota por Luis
        Vote::create([
            'voteId' => 'VOTE004',
            'voter' => 7, // Isabel
            'voterVoted' => 2, // Luis
            'date' => now(),
        ]);

        // Roberto vota por Carmen
        Vote::create([
            'voteId' => 'VOTE005',
            'voter' => 8, // Roberto
            'voterVoted' => 3, // Carmen
            'date' => now(),
        ]);
    }
}
