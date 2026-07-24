<?php

namespace App\Repositories;

use App\Models\Url;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class UrlRepository
{
    public function paginateByUser(int $userId, int $perPage = 10, int $page = 1): LengthAwarePaginator
    {
        return Url::query()
            ->where('user_id', $userId)
            ->orderByDesc('created_at')
            ->paginate(perPage: $perPage, page: $page);
    }

    public function countByUser(int $userId): int
    {
        return Url::query()->where('user_id', $userId)->count();
    }

    public function create(array $data): Url
    {
        return Url::query()->create($data);
    }

    public function findById(int $urlId): ?Url
    {
        return Url::query()->find($urlId);
    }

    public function delete(Url $url): void
    {
        $url->delete();
    }

    public function slugExists(string $slug): bool
    {
        return Url::query()->where('slug', $slug)->exists();
    }

    public function findBySlug(string $slug): ?Url
    {
        return Url::query()->where('slug', $slug)->first();
    }
}
