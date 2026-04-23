<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('votes', function (Blueprint $table) {
            $table->id();
            $table->string('voteId', 50)->unique();
            $table->unsignedBigInteger('voter');
            $table->unsignedBigInteger('voterVoted');
            $table->dateTime('date');
            $table->timestamps();

            $table->foreign('voter')->references('id')->on('voters');
            $table->foreign('voterVoted')->references('id')->on('voters');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('votes');
    }
};
