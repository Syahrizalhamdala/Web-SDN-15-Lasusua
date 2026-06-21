<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    protected $table = 'siswa';

    protected $fillable = [
        'nis',
        'nama',
        'kelas',
        'tanggal_lahir',
        'nama_ayah',
        'nama_ibu',
        'no_hp_ortu',
        'user_id_ortu',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
    ];

    public function absensi()
    {
        return $this->hasMany(Absensi::class);
    }

    public function nilai()
    {
        return $this->hasMany(Nilai::class);
    }
}
