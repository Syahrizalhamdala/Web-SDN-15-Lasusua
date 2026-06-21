<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Guru extends Model
{
    protected $table = 'guru';

    protected $fillable = [
        'nip',
        'nama',
        'mata_pelajaran',
        'kelas_pengampu',
        'user_id',
        'jabatan',
        'status',
        'foto',
    ];
}
