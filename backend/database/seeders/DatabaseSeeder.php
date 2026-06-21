<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            GuruSeeder::class,
            GallerySeeder::class,
            PostSeeder::class,
        ]);

        $superAdmin = Role::firstOrCreate(
            ['slug' => 'super-admin'],
            ['name' => 'Super Admin']
        );

        Role::firstOrCreate(
            ['slug' => 'admin'],
            ['name' => 'Admin']
        );

        Role::firstOrCreate(
            ['slug' => 'user'],
            ['name' => 'User']
        );

        User::updateOrCreate(
            ['email' => 'admin@sekolah.sch.id'],
            [
                'name' => 'Admin',
                'password' => 'password',
                'role_id' => $superAdmin->id,
            ]
        );
    }
}
