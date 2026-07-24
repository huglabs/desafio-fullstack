<?php

namespace App\Repositories;

use App\Models\UrlAccess;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class UrlAccessRepository
{
    public function create(int $urlId, string $ip, string $userAgent, ?Carbon $accessedAt = null): UrlAccess
    {
        return UrlAccess::query()->create([
            'url_id' => $urlId,
            'ip' => $ip,
            'user_agent' => $userAgent,
            'accessed_at' => $accessedAt ?? now(),
        ]);
    }

    public function countByUrl(int $urlId): int
    {
        return UrlAccess::query()->where('url_id', $urlId)->count();
    }

    public function getAccessesSince(int $urlId, Carbon $since): Collection
    {
        return UrlAccess::query()
            ->where('url_id', $urlId)
            ->where('accessed_at', '>=', $since)
            ->get(['accessed_at']);
    }

    public function countByUser(int $userId): int
    {
        return UrlAccess::query()
            ->whereHas('url', fn ($query) => $query->where('user_id', $userId))
            ->count();
    }

    public function countByUserToday(int $userId): int
    {
        return UrlAccess::query()
            ->whereHas('url', fn ($query) => $query->where('user_id', $userId))
            ->whereDate('accessed_at', today())
            ->count();
    }

    public function getAccessesSinceForUser(int $userId, Carbon $since): Collection
    {
        return UrlAccess::query()
            ->whereHas('url', fn ($query) => $query->where('user_id', $userId))
            ->where('accessed_at', '>=', $since)
            ->get(['accessed_at']);
    }
}
