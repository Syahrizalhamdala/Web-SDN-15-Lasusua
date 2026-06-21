<?php

namespace Database\Seeders;

use App\Models\GalleryAlbum;
use App\Models\GalleryPhoto;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $album = GalleryAlbum::updateOrCreate(
            ['slug' => 'kegiatan-sekolah-2025'],
            [
                'title' => 'Kegiatan Sekolah 2025',
                'description' => 'Dokumentasi kegiatan SD Negeri 15 Lasusua tahun 2025',
                'cover_image' => 'album_covers/01KVMHE489BN4SN5R83VA90WMC.jpg',
                'event_date' => '2025-06-01',
            ]
        );

        $photos = [
            ['caption' => 'Upacara Bendera', 'path' => 'gallery/01KVMHE48ATTZCPCEAPQ90P1TV.jpg', 'sort' => 1],
            ['caption' => 'Kegiatan Belajar Mengajar', 'path' => 'gallery/01KVMHE48ATTZCPCEAPQ90P1TV_2.jpg', 'sort' => 2],
            ['caption' => 'Lomba Mewarnai', 'path' => 'gallery/01KVMHE48ATTZCPCEAPQ90P1TV_3.jpg', 'sort' => 3],
            ['caption' => 'Olahraga Bersama', 'path' => 'gallery/01KVMHE48ATTZCPCEAPQ90P1TV_4.jpg', 'sort' => 4],
            ['caption' => 'Kegiatan Pramuka', 'path' => 'gallery/01KVMHE48ATTZCPCEAPQ90P1TV_5.jpg', 'sort' => 5],
            ['caption' => 'Karya Siswa', 'path' => 'gallery/01KVMHE48ATTZCPCEAPQ90P1TV_6.jpg', 'sort' => 6],
        ];

        foreach ($photos as $photo) {
            GalleryPhoto::updateOrCreate(
                ['gallery_album_id' => $album->id, 'sort_order' => $photo['sort']],
                [
                    'path' => $photo['path'],
                    'caption' => $photo['caption'],
                ]
            );
        }

        $album2 = GalleryAlbum::updateOrCreate(
            ['slug' => 'lomba-mewarnai-2025'],
            [
                'title' => 'Lomba Mewarnai 2025',
                'description' => 'Dokumentasi lomba mewarnai antar siswa SD se-Kecamatan Lasusua',
                'cover_image' => 'gallery/01KVMHE48ATTZCPCEAPQ90P1TV.jpg',
                'event_date' => '2025-04-15',
            ]
        );

        GalleryPhoto::updateOrCreate(
            ['gallery_album_id' => $album2->id, 'sort_order' => 1],
            [
                'path' => 'gallery/01KVMHE48ATTZCPCEAPQ90P1TV.jpg',
                'caption' => 'Suasana Lomba Mewarnai',
            ]
        );
    }
}
