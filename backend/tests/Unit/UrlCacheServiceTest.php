<?php

namespace Tests\Unit;

use App\Services\UrlCacheService;
use App\Support\CacheKeys;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class UrlCacheServiceTest extends TestCase
{
    public function test_remember_stores_value_with_ttl(): void
    {
        $service = app(UrlCacheService::class);

        $value = $service->remember('test-key', fn () => 'cached-value');

        $this->assertSame('cached-value', $value);
        $this->assertSame('cached-value', Cache::get('test-key'));
    }

    public function test_remember_with_refresh_forgets_before_storing(): void
    {
        $service = app(UrlCacheService::class);
        Cache::put('test-key', 'stale', CacheKeys::TTL);

        $value = $service->remember('test-key', fn () => 'fresh-value', refresh: true);

        $this->assertSame('fresh-value', $value);
    }

    public function test_forget_user_urls_increments_version(): void
    {
        $service = app(UrlCacheService::class);

        $this->assertSame(1, $service->getUserUrlsVersion(42));

        $service->forgetUserUrls(42);

        $this->assertSame(2, $service->getUserUrlsVersion(42));
    }

    public function test_forget_for_user_clears_dashboard_and_bumps_list_version(): void
    {
        $service = app(UrlCacheService::class);
        Cache::put(CacheKeys::dashboard(7), ['total_urls' => 1], CacheKeys::TTL);

        $service->forgetForUser(7);

        $this->assertNull(Cache::get(CacheKeys::dashboard(7)));
        $this->assertSame(2, $service->getUserUrlsVersion(7));
    }
}
