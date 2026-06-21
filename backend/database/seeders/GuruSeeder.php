<?php

namespace Database\Seeders;

use App\Models\Guru;
use Illuminate\Database\Seeder;

class GuruSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'nip' => '197803242006042018',
                'nama' => 'Ainul, S.Pd',
                'mata_pelajaran' => '-',
                'jabatan' => 'Kepala Sekolah',
                'status' => 'PNS',
                'foto' => '/kepsek.jpeg',
            ],
            [
                'nip' => '197008272000031008',
                'nama' => 'Heryantosasi S, S.Pd',
                'mata_pelajaran' => 'PAI',
                'jabatan' => 'Guru',
                'status' => 'PNS',
                'foto' => 'https://placehold.co/200x200?text=Guru',
            ],
            [
                'nip' => '198203132014112002',
                'nama' => 'Nurhijah, S.Ag',
                'mata_pelajaran' => 'Pendidikan Agama Islam',
                'jabatan' => 'Guru',
                'status' => 'PNS',
                'foto' => 'https://placehold.co/200x200?text=Guru',
            ],
            [
                'nip' => '199308122022212007',
                'nama' => 'Yusrah Sahiruddin, S.Pd',
                'mata_pelajaran' => 'Guru Kelas',
                'jabatan' => 'Guru',
                'status' => 'PPPK',
                'foto' => 'https://placehold.co/200x200?text=Guru',
            ],
            [
                'nip' => '199008282023212028',
                'nama' => 'Rahmaniar, S.Pd',
                'mata_pelajaran' => 'Guru Kelas',
                'jabatan' => 'Guru',
                'status' => 'PPPK',
                'foto' => 'https://placehold.co/200x200?text=Guru',
            ],
            [
                'nip' => '19881005202411003',
                'nama' => 'Zakaria, S.Pd',
                'mata_pelajaran' => 'PJOK',
                'jabatan' => 'Guru',
                'status' => 'PPPK',
                'foto' => 'https://placehold.co/200x200?text=Guru',
            ],
            [
                'nip' => '164176760300002',
                'nama' => 'Suarnis, S.Pd',
                'mata_pelajaran' => 'Guru Kelas',
                'jabatan' => 'Guru',
                'status' => 'Honorer',
                'foto' => 'https://placehold.co/200x200?text=Honorer',
            ],
            [
                'nip' => '0339765666131103',
                'nama' => 'Ratna, S.Pd',
                'mata_pelajaran' => 'Guru Kelas',
                'jabatan' => 'Guru',
                'status' => 'Honorer',
                'foto' => 'https://placehold.co/200x200?text=Honorer',
            ],
            [
                'nip' => '999001',
                'nama' => 'Mustika Faramita, SE',
                'mata_pelajaran' => '-',
                'jabatan' => 'Admin Sekolah',
                'status' => 'Honorer',
                'foto' => 'https://placehold.co/200x200?text=Admin',
            ],
            [
                'nip' => '3860775676230122',
                'nama' => 'Teri Eka, S.Pd',
                'mata_pelajaran' => 'Guru Kelas',
                'jabatan' => 'Guru',
                'status' => 'Honorer',
                'foto' => 'https://placehold.co/200x200?text=Honorer',
            ],
            [
                'nip' => '999002',
                'nama' => 'Ihwal, S.Pd',
                'mata_pelajaran' => '-',
                'jabatan' => 'Operator Sekolah',
                'status' => 'Honorer',
                'foto' => 'https://placehold.co/200x200?text=Operator',
            ],
        ];

        foreach ($data as $item) {
            Guru::updateOrCreate(
                ['nip' => $item['nip']],
                $item
            );
        }
    }
}
