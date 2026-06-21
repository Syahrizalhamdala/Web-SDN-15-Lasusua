<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class SupabaseService
{
    protected string $url;
    protected string $anonKey;
    protected string $serviceKey;

    public function __construct()
    {
        $this->url = config('services.supabase.url');
        $this->anonKey = config('services.supabase.anon_key');
        $this->serviceKey = config('services.supabase.service_key');
    }

    public function signUp(string $email, string $password, array $userData = []): array
    {
        $response = Http::withHeaders([
            'apikey' => $this->anonKey,
            'Content-Type' => 'application/json',
        ])->post("{$this->url}/auth/v1/signup", [
            'email' => $email,
            'password' => $password,
            'data' => $userData,
        ]);

        return $response->json();
    }

    public function signIn(string $email, string $password): array
    {
        $response = Http::withHeaders([
            'apikey' => $this->anonKey,
            'Content-Type' => 'application/json',
        ])->post("{$this->url}/auth/v1/token?grant_type=password", [
            'email' => $email,
            'password' => $password,
        ]);

        return $response->json();
    }

    public function getUser(string $token): array
    {
        $response = Http::withToken($token)
            ->withHeaders(['apikey' => $this->anonKey])
            ->get("{$this->url}/auth/v1/user");

        return $response->json();
    }

    public function signOut(string $token): array
    {
        $response = Http::withToken($token)
            ->withHeaders(['apikey' => $this->anonKey])
            ->post("{$this->url}/auth/v1/logout");

        return ['success' => $response->successful()];
    }

    public function upload(string $bucket, string $path, $file, string $visibility = 'public'): ?string
    {
        $response = Http::withHeaders([
            'apikey' => $this->anonKey,
            'Authorization' => "Bearer {$this->serviceKey}",
        ])->post("{$this->url}/storage/v1/object/{$bucket}/{$path}", [
            'file' => $file,
        ]);

        if ($response->successful()) {
            return "{$this->url}/storage/v1/object/public/{$bucket}/{$path}";
        }

        return null;
    }

    public function delete(string $bucket, string $path): bool
    {
        $response = Http::withHeaders([
            'apikey' => $this->anonKey,
            'Authorization' => "Bearer {$this->serviceKey}",
        ])->delete("{$this->url}/storage/v1/object/{$bucket}/{$path}");

        return $response->successful();
    }
}
