<?php

namespace App\Services;

use App\Models\Berita;
use App\Models\Download;
use App\Models\GalleryAlbum;
use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Post;

class SchoolContextService
{
    protected array $stopwords = [
        'apa', 'siapa', 'dimana', 'kapan', 'mengapa', 'bagaimana',
        'yang', 'di', 'ke', 'dari', 'pada', 'dengan', 'dan', 'atau',
        'ini', 'itu', 'saya', 'kamu', 'dia', 'kami', 'kita', 'mereka',
        'adalah', 'bisa', 'tolong', 'hai', 'halo', 'oh', 'ya', 'tidak',
        'sudah', 'belum', 'akan', 'sedang', 'telah', 'untuk', 'agar',
        'supaya', 'seperti', 'sebagai', 'tentang', 'oleh', 'secara',
        'saja', 'juga', 'lagi', 'masih', 'semua', 'setiap', 'beberapa',
        'seorang', 'sebuah', 'tersebut', 'para', 'silahkan', 'silakan',
        'saya', 'aku', 'anda', 'kak', 'pak', 'bu', 'mas', 'mbak',
        'tolong', 'bantu', 'minta', 'info', 'informasi',
    ];

    public function getContext(string $question): string
    {
        $keywords = $this->extractKeywords($question);

        if (empty($keywords)) {
            return '';
        }

        $parts = [];

        $berita = $this->searchBerita($keywords);
        if ($berita) $parts[] = $berita;

        $posts = $this->searchPosts($keywords);
        if ($posts) $parts[] = $posts;

        $guru = $this->searchGuru($keywords);
        if ($guru) $parts[] = $guru;

        $kelas = $this->searchKelas($keywords);
        if ($kelas) $parts[] = $kelas;

        $downloads = $this->searchDownloads($keywords);
        if ($downloads) $parts[] = $downloads;

        $galeri = $this->searchGaleri($keywords);
        if ($galeri) $parts[] = $galeri;

        return implode("\n\n", $parts);
    }

    protected function extractKeywords(string $question): array
    {
        $words = preg_split('/[\s\p{P}]+/u', strtolower($question));
        return array_values(array_unique(array_filter($words, function ($w) {
            return mb_strlen($w) > 2 && !in_array($w, $this->stopwords);
        })));
    }

    protected function buildLikeClauses(array $keywords, array $columns): array
    {
        $clauses = [];
        foreach ($keywords as $keyword) {
            foreach ($columns as $col) {
                $clauses[] = [$col, 'like', "%{$keyword}%"];
            }
        }
        return $clauses;
    }

    protected function searchBerita(array $keywords): ?string
    {
        $query = Berita::whereNotNull('published_at');
        $clauses = $this->buildLikeClauses($keywords, ['judul', 'isi']);
        foreach ($clauses as $clause) {
            $query->orWhere(...$clause);
        }
        $results = $query->latest('published_at')->take(3)->get();
        if ($results->isEmpty()) return null;

        $lines = ["=== BERITA ==="];
        foreach ($results as $item) {
            $judul = $item->judul;
            $isi = mb_substr(strip_tags($item->isi ?? ''), 0, 200);
            $tgl = optional($item->published_at)->format('d M Y') ?? '-';
            $lines[] = "- {$judul} ({$tgl}): {$isi}...";
        }
        return implode("\n", $lines);
    }

    protected function searchPosts(array $keywords): ?string
    {
        $query = Post::where('status', 'published');
        $clauses = $this->buildLikeClauses($keywords, ['title', 'content']);
        foreach ($clauses as $clause) {
            $query->orWhere(...$clause);
        }
        $results = $query->latest('published_at')->take(3)->get();
        if ($results->isEmpty()) return null;

        $lines = ["=== POSTINGAN ==="];
        foreach ($results as $item) {
            $title = $item->title;
            $content = mb_substr(strip_tags($item->content ?? ''), 0, 200);
            $tgl = optional($item->published_at)->format('d M Y') ?? '-';
            $lines[] = "- {$title} ({$tgl}): {$content}...";
        }
        return implode("\n", $lines);
    }

    protected function searchGuru(array $keywords): ?string
    {
        $query = Guru::query();
        $clauses = $this->buildLikeClauses($keywords, ['nama', 'mata_pelajaran']);
        foreach ($clauses as $clause) {
            $query->orWhere(...$clause);
        }
        $results = $query->take(5)->get();
        if ($results->isEmpty()) return null;

        $lines = ["=== GURU & TENAGA KEPENDIDIKAN ==="];
        foreach ($results as $item) {
            $lines[] = "- {$item->nama} — Mapel: {$item->mata_pelajaran}" . ($item->kelas_pengampu ? ", Kelas: {$item->kelas_pengampu}" : '');
        }
        return implode("\n", $lines);
    }

    protected function searchKelas(array $keywords): ?string
    {
        $query = Kelas::query();
        $clauses = $this->buildLikeClauses($keywords, ['nama_kelas', 'tingkat', 'tahun_ajaran']);
        foreach ($clauses as $clause) {
            $query->orWhere(...$clause);
        }
        $results = $query->take(5)->get();
        if ($results->isEmpty()) return null;

        $lines = ["=== KELAS ==="];
        foreach ($results as $item) {
            $wali = $item->waliKelas ? $item->waliKelas->nama : '-';
            $lines[] = "- {$item->nama_kelas} ({$item->tingkat}), Wali Kelas: {$wali}";
        }
        return implode("\n", $lines);
    }

    protected function searchDownloads(array $keywords): ?string
    {
        $query = Download::where('is_active', true);
        $clauses = $this->buildLikeClauses($keywords, ['title', 'description']);
        foreach ($clauses as $clause) {
            $query->orWhere(...$clause);
        }
        $results = $query->latest()->take(3)->get();
        if ($results->isEmpty()) return null;

        $lines = ["=== DOKUMEN & UNDUHAN ==="];
        foreach ($results as $item) {
            $lines[] = "- {$item->title}" . ($item->description ? ": {$item->description}" : '');
        }
        return implode("\n", $lines);
    }

    protected function searchGaleri(array $keywords): ?string
    {
        $query = GalleryAlbum::query();
        $clauses = $this->buildLikeClauses($keywords, ['title', 'description']);
        foreach ($clauses as $clause) {
            $query->orWhere(...$clause);
        }
        $results = $query->latest()->take(3)->get();
        if ($results->isEmpty()) return null;

        $lines = ["=== GALERI ==="];
        foreach ($results as $item) {
            $fotoCount = $item->galleryPhotos()->count();
            $tgl = optional($item->event_date)->format('d M Y') ?? '-';
            $lines[] = "- {$item->title} ({$tgl}, {$fotoCount} foto)";
        }
        return implode("\n", $lines);
    }
}
