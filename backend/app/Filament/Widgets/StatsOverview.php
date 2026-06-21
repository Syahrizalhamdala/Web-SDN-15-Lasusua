<?php

namespace App\Filament\Widgets;

use App\Models\Download;
use App\Models\GalleryPhoto;
use App\Models\Post;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Berita', Post::published()->count())
                ->icon('heroicon-o-newspaper')
                ->color('success')
                ->description('artikel telah diterbitkan'),
            Stat::make('Total Foto', GalleryPhoto::count())
                ->icon('heroicon-o-photo')
                ->color('info')
                ->description('foto dalam galeri'),
            Stat::make('Total Unduhan', Download::sum('download_count'))
                ->icon('heroicon-o-arrow-down-tray')
                ->color('warning')
                ->description('kali file diunduh'),
            Stat::make('Total Dokumen', Download::where('is_active', true)->count())
                ->icon('heroicon-o-document')
                ->color('primary')
                ->description('dokumen tersedia'),
        ];
    }
}
