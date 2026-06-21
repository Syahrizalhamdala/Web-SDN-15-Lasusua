<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DownloadResource\Pages;
use App\Models\Download;
use Carbon\Carbon;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class DownloadResource extends Resource
{
    protected static ?string $model = Download::class;

    protected static ?string $navigationIcon = 'heroicon-o-arrow-down-tray';

    protected static ?string $navigationGroup = 'Unduhan';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        $tahun = Carbon::now()->format('Y');
        $bulan = Carbon::now()->format('m');

        return $form
            ->schema([
                TextInput::make('title')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),
                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true),
                Select::make('download_category_id')
                    ->relationship('downloadCategory', 'name')
                    ->required(),
                Textarea::make('description')
                    ->nullable()
                    ->rows(2),
                FileUpload::make('file_path')
                    ->label('File')
                    ->disk('public')
                    ->directory("downloads/{$tahun}/{$bulan}")
                    ->acceptedFileTypes([
                        'application/pdf',
                        'application/msword',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                        'application/vnd.ms-excel',
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    ])
                    ->maxSize(10240)
                    ->required(fn ($context) => $context === 'create')
                    ->afterStateUpdated(function ($state, callable $set, callable $get) {
                        if ($state) {
                            $set('file_name', $state->getClientOriginalName());
                            $set('file_size', $state->getSize());
                            $set('file_type', $state->getMimeType());
                        }
                    }),
                Toggle::make('is_active')
                    ->label('Tampilkan di halaman publik')
                    ->default(true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('downloadCategory.name')
                    ->badge(),
                TextColumn::make('file_size_label')
                    ->label('Ukuran'),
                TextColumn::make('file_type')
                    ->label('Tipe File'),
                TextColumn::make('download_count')
                    ->label('Diunduh')
                    ->sortable(),
                ToggleColumn::make('is_active')
                    ->label('Aktif'),
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
            'index' => Pages\ManageDownloads::route('/'),
        ];
    }
}
