<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\Berita;
use App\Models\Download;
use App\Models\Galeri;
use App\Models\GalleryAlbum;
use App\Models\GalleryPhoto;
use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Post;
use App\Models\Siswa;
use App\Services\SchoolContextService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class PublicController extends Controller
{
    public function index()
    {
        return response()->json([
            'nama_sekolah' => 'SD Negeri 15 Lasusua',
            'alamat' => 'Jl. Totallang, Kec. Lasusua',
            'visi' => 'Menciptakan generasi cerdas, berakhlak mulia, dan berwawasan global',
            'misi' => [
                'Menyelenggarakan pendidikan berkualitas',
                'Mengembangkan potensi siswa secara optimal',
                'Menanamkan nilai-nilai karakter bangsa',
            ],
            'total_siswa' => Siswa::count(),
            'total_guru' => Guru::count(),
            'total_kelas' => Kelas::count(),
            'berita_terbaru' => Berita::where('kategori', 'berita')->whereNotNull('published_at')->latest()->take(3)->get(),
            'pengumuman_terbaru' => Berita::where('kategori', 'pengumuman')->whereNotNull('published_at')->latest()->take(3)->get(),
        ]);
    }

    public function berita()
    {
        return response()->json(
            Berita::where('kategori', 'berita')->whereNotNull('published_at')->latest()->paginate(9)
        );
    }

    public function beritaDetail($id)
    {
        return response()->json(
            Berita::findOrFail($id)
        );
    }

    public function galeri()
    {
        return response()->json(
            Galeri::latest()->paginate(12)
        );
    }

    public function kontak()
    {
        return response()->json([
            'nama_sekolah' => 'SD Negeri 15 Lasusua',
            'alamat' => 'Jl. Totallang, Kec. Lasusua',
            'telepon' => '(0404) 1234567',
            'email' => 'sd15lasusua@sch.id',
        ]);
    }

    public function posts()
    {
        $posts = Post::with('category')->published()->latest('published_at')->paginate(9);

        $posts->getCollection()->transform(function ($post) {
            return [
                'id' => $post->id,
                'slug' => $post->slug,
                'judul' => $post->title,
                'kategori' => $post->category?->name ?? 'Berita',
                'tanggal' => $post->published_at?->isoFormat('D MMMM Y') ?? '',
                'ringkasan' => strip_tags(substr($post->content, 0, 200)),
                'konten' => $post->content,
                'thumbnail' => $post->thumbnail ?? 'https://placehold.co/400x250/1a5276/white?text=Berita',
            ];
        });

        return response()->json($posts);
    }

    public function postDetail($slug)
    {
        $post = Post::with('category')->where('slug', $slug)->published()->firstOrFail();

        return response()->json([
            'id' => $post->id,
            'slug' => $post->slug,
            'judul' => $post->title,
            'kategori' => $post->category?->name ?? 'Berita',
            'tanggal' => $post->published_at?->isoFormat('D MMMM Y') ?? '',
            'ringkasan' => strip_tags(substr($post->content, 0, 200)),
            'konten' => $post->content,
            'thumbnail' => $post->thumbnail ?? 'https://placehold.co/400x250/1a5276/white?text=Berita',
        ]);
    }

    public function guruList()
    {
        return response()->json(Guru::all()->map(function ($guru) {
            return [
                'id' => $guru->id,
                'nip' => $guru->nip,
                'nama' => $guru->nama,
                'mapel' => $guru->mata_pelajaran,
                'jabatan' => $guru->jabatan,
                'status' => $guru->status,
                'foto' => $guru->foto
                    ? (str_starts_with($guru->foto, 'http') ? $guru->foto : asset($guru->foto))
                    : 'https://placehold.co/200x200/1a5276/white?text=Guru',
            ];
        }));
    }

    public function siswaData()
    {
        $kelasList = Kelas::with('waliKelas')->get();

        $result = $kelasList->map(function ($kelas) {
            $siswas = Siswa::where('kelas', $kelas->nama_kelas)->get();
            $jumlahLaki = $siswas->where('jenis_kelamin', 'L')->count();
            $jumlahPerempuan = $siswas->where('jenis_kelamin', 'P')->count();

            return [
                'kelas' => $kelas->nama_kelas,
                'waliKelas' => $kelas->waliKelas?->nama ?? '-',
                'jumlahLaki' => $jumlahLaki,
                'jumlahPerempuan' => $jumlahPerempuan,
                'total' => $siswas->count(),
            ];
        });

        return response()->json($result);
    }

    public function downloadsList()
    {
        $downloads = Download::with('downloadCategory')
            ->where('is_active', true)
            ->latest()
            ->get();

        return response()->json($downloads->map(function ($download) {
            return [
                'id' => $download->id,
                'nama' => $download->title,
                'kategori' => $download->downloadCategory?->name ?? 'Umum',
                'ukuran' => $download->file_size_label,
                'tanggal' => $download->created_at->isoFormat('D MMMM Y'),
                'url' => $download->file_path && Storage::disk('public')->exists($download->file_path)
                    ? asset('storage/' . $download->file_path)
                    : '',
            ];
        }));
    }

    public function albumsList()
    {
        $albums = GalleryAlbum::withCount('galleryPhotos')
            ->latest()
            ->get();

        return response()->json($albums->map(function ($album) {
            return [
                'id' => $album->id,
                'judul' => $album->title,
                'slug' => $album->slug,
                'deskripsi' => $album->description,
                'cover' => $album->cover_image
                    ? asset('storage/' . $album->cover_image)
                    : 'https://placehold.co/600x400/1a5276/white?text=Album',
                'jumlah_foto' => $album->gallery_photos_count,
                'tanggal' => $album->event_date?->isoFormat('D MMMM Y') ?? '',
            ];
        }));
    }

    public function photosList()
    {
        $photos = GalleryPhoto::with('galleryAlbum')
            ->orderBy('sort_order')
            ->get();

        return response()->json($photos->map(function ($photo) {
            return [
                'id' => $photo->id,
                'src' => $photo->path
                    ? asset('storage/' . $photo->path)
                    : 'https://placehold.co/600x400/1a5276/white?text=Foto',
                'judul' => $photo->caption ?? ($photo->galleryAlbum?->title ?? 'Foto'),
                'album' => $photo->galleryAlbum?->title ?? '',
            ];
        }));
    }

    public function chatbot(Request $request, SchoolContextService $contextService)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $message = $request->input('message');
        $context = $contextService->getContext($message);

        $systemPrompt = 'Anda adalah asisten virtual SD Negeri 15 Lasusua yang berlokasi di Kabupaten Kolaka Utara, Sulawesi Tenggara. ';

        if ($context) {
            $systemPrompt .= "Jawablah pertanyaan berdasarkan KONTEKS berikut. Jika konteks tidak cukup, katakan Anda tidak memiliki informasi tersebut.\n\nKONTEKS:\n{$context}";
        } else {
            $systemPrompt .= 'Jawablah sebisanya. Jika tidak tahu, katakan tidak tahu.';
        }

        $response = Http::withToken(config('services.groq.api_key'))
            ->post('https://api.groq.com/openai/v1/chat/completions', [
                'model' => 'llama-3.3-70b-versatile',
                'messages' => [
                    ['role' => 'system', 'content' => $systemPrompt],
                    ['role' => 'user', 'content' => $message],
                ],
                'max_tokens' => 1024,
                'temperature' => 0.7,
            ]);

        $data = $response->json();
        $reply = $data['choices'][0]['message']['content'] ?? 'Maaf, saya tidak dapat memproses pertanyaan Anda saat ini.';

        return response()->json([
            'reply' => $reply,
        ]);
    }
}
