<?php

namespace Database\Seeders;

use App\Models\Voter;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VoterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Candidatos
        Voter::create([
            'document' => '12345678',
            'name' => 'Ana',
            'lastName' => 'Martínez',
            'dob' => '1985-03-15',
            'isCandidate' => true,
        ]);

        Voter::create([
            'document' => '87654321',
            'name' => 'Luis',
            'lastName' => 'Fernández',
            'dob' => '1978-07-22',
            'isCandidate' => true,
        ]);

        Voter::create([
            'document' => '11223344',
            'name' => 'Carmen',
            'lastName' => 'López',
            'dob' => '1982-11-08',
            'isCandidate' => true,
        ]);

        // Votantes regulares
        Voter::create([
            'document' => '55667788',
            'name' => 'Pedro',
            'lastName' => 'Sánchez',
            'dob' => '1990-01-10',
            'isCandidate' => false,
        ]);

        Voter::create([
            'document' => '99887766',
            'name' => 'Laura',
            'lastName' => 'García',
            'dob' => '1988-05-20',
            'isCandidate' => false,
        ]);

        Voter::create([
            'document' => '33445566',
            'name' => 'Miguel',
            'lastName' => 'Torres',
            'dob' => '1992-09-14',
            'isCandidate' => false,
        ]);

        Voter::create([
            'document' => '77889900',
            'name' => 'Isabel',
            'lastName' => 'Ramírez',
            'dob' => '1986-12-03',
            'isCandidate' => false,
        ]);

        Voter::create([
            'document' => '44556677',
            'name' => 'Roberto',
            'lastName' => 'Morales',
            'dob' => '1995-06-28',
            'isCandidate' => false,
        ]);
    }
}
