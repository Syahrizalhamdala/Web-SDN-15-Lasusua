<?php

namespace App\Filament\Resources;

use App\Filament\Resources\GalleryAlbumResource\Pages;
use App\Models\GalleryAlbum;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class GalleryAlbumResource extends Resource
{
    protected static ?string $model = GalleryAlbum::class;

    protected static ?string $navigationIcon = 'heroicon-o-photo';

    protected static ?string $navigationGroup = 'Galeri';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('title')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),
                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true),
                DatePicker::make('event_date')
                    ->label('Tanggal Kegiatan')
                    ->nullable(),
                Textarea::make('description')
                    ->nullable()
                    ->rows(3),
                FileUpload::make('cover_image')
                    ->disk('public')
                    ->directory('album_covers')
                    ->image()
                    ->nullable(),
                Repeater::make('galleryPhotos')
                    ->label('Foto-foto dalam album')
                    ->relationship()
                    ->reorderable()
                    ->schema([
                        FileUpload::make('path')
                            ->disk('public')
                            ->directory('gallery')
                            ->image()
                            ->required(),
                        TextInput::make('caption')
                            ->nullable(),
                        Hidden::make('sort_order')
                            ->default(0),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('cover_image')
                    ->size(60)
                    ->rounded(),
                TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('event_date')
                    ->date('d M Y'),
                TextColumn::make('gallery_photos_count')
                    ->label('Jumlah Foto')
                    ->counts('galleryPhotos'),
                TextColumn::make('created_at')
                    ->since(),
            ])
            ->filters([])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageGalleryAlbums::route('/'),
        ];
    }
}
