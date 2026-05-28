<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Admin::create([
            'adminId' => 'ADM001',
            'name' => 'Admin',
            'lastName' => 'Test',
            'email' => 'admin.test@admin.com',
            'password' => Hash::make('password123'),
        ]);

        Admin::create([
            'adminId' => 'ADM002',
            'name' => 'María',
            'lastName' => 'González',
            'email' => 'maria.gonzalez@admin.com',
            'password' => Hash::make('password123'),
        ]);

        Admin::create([
            'adminId' => 'ADM003',
            'name' => 'Carlos',
            'lastName' => 'Rodríguez',
            'email' => 'carlos.rodriguez@admin.com',
            'password' => Hash::make('password123'),
        ]);
    }
}
