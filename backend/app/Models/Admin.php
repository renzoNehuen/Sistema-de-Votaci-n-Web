<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $table = 'admins';
    protected $fillable = [
        'adminId',
        'name',
        'lastName',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
    ];

}
