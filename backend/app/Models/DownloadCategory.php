<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DownloadCategory extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'sort_order'];

    public function downloads(): HasMany
    {
        return $this->hasMany(Download::class);
    }
}
