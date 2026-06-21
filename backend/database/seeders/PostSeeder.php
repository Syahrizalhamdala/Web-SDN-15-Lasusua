<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $akademik = Category::firstWhere('slug', 'akademik') ?? Category::where('id', 1)->first();

        $posts = [
            [
                'title' => 'Upacara Hari Pendidikan Nasional 2025',
                'content' => 'SD Negeri 15 Lasusua menggelar upacara bendera memperingati Hardiknas 2025 yang diikuti seluruh siswa, guru, dan tenaga kependidikan. Kegiatan berlangsung khidmat di lapangan sekolah.',
            ],
            [
                'title' => 'Lomba Mewarnai Tingkat SD Se-Kecamatan',
                'content' => 'Dua siswa SD Negeri 15 Lasusua meraih juara 1 dan 2 lomba mewarnai tingkat SD se-Kecamatan Lasusua. Prestasi ini membanggakan sekolah dan menjadi motivasi bagi siswa lainnya.',
            ],
            [
                'title' => 'Penerimaan Rapor Semester Genap',
                'content' => 'Pembagian rapor semester genap TA 2024/2025 dilaksanakan pada 20 Juni 2025. Orang tua/wali siswa diharapkan hadir untuk menerima hasil belajar putra-putrinya.',
            ],
            [
                'title' => 'Kegiatan Belajar Mengajar Semester Baru',
                'content' => 'Semester baru tahun ajaran 2025/2026 dimulai pada 16 Juli 2025. Seluruh siswa diharapkan mempersiapkan perlengkapan belajar dan hadir tepat waktu.',
            ],
        ];

        foreach ($posts as $post) {
            Post::create([
                'title' => $post['title'],
                'slug' => Str::slug($post['title']) . '-' . Str::random(4),
                'category_id' => $akademik->id,
                'content' => $post['content'],
                'status' => 'published',
                'published_at' => now()->subDays(rand(1, 30)),
            ]);
        }
    }
}
