<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GalleryAlbum extends Model
{
    protected $fillable = [
        'title', 'slug', 'event_date', 'description', 'cover_image',
    ];

    protected function casts(): array
    {
        return [
            'event_date' => 'date',
        ];
    }

    public function galleryPhotos(): HasMany
    {
        return $this->hasMany(GalleryPhoto::class);
    }
}
