<?php

namespace App\Services;

use App\Support\CacheKeys;
use Illuminate\Support\Facades\Cache;

class UrlCacheService
{
    public function remember(string $key, callable $callback, bool $refresh = false): mixed
    {
        if ($refresh) {
            Cache::forget($key);
        }

        return Cache::remember($key, CacheKeys::TTL, $callback);
    }

    public function getUserUrlsVersion(int $userId): int
    {
        $key = CacheKeys::userUrlsVersion($userId);

        if (! Cache::has($key)) {
            Cache::put($key, 1, CacheKeys::VERSION_TTL);

            return 1;
        }

        return (int) Cache::get($key, 1);
    }

    public function forgetDashboard(int $userId): void
    {
        Cache::forget(CacheKeys::dashboard($userId));
    }

    public function forgetUserUrls(int $userId): void
    {
        $key = CacheKeys::userUrlsVersion($userId);
        $version = $this->getUserUrlsVersion($userId);
        Cache::put($key, $version + 1, CacheKeys::VERSION_TTL);
    }

    public function forgetSlug(string $slug): void
    {
        Cache::forget(CacheKeys::slug($slug));
    }

    public function forgetForUser(int $userId): void
    {
        $this->forgetDashboard($userId);
        $this->forgetUserUrls($userId);
    }
}
