<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'user_id',
        'nama',
        'role',
        'no_hp',
    ];

    protected $casts = [
        'role' => 'string',
    ];
}
