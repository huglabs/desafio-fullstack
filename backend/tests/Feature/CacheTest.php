<?php

namespace Tests\Feature;

use App\Models\Url;
use App\Models\User;
use App\Support\CacheKeys;
use Illuminate\Support\Facades\Cache;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CacheTest extends TestCase
{
    public function test_dashboard_is_cached_until_refresh(): void
    {
        $user = User::factory()->create();
        Url::query()->create([
            'user_id' => $user->id,
            'original_url' => 'https://example.com',
            'slug' => 'cache001',
        ]);

        Sanctum::actingAs($user);

        $this->getJson('/api/dashboard')->assertOk()->assertJsonPath('total_urls', 1);

        Url::query()->create([
            'user_id' => $user->id,
            'original_url' => 'https://example.com/2',
            'slug' => 'cache002',
        ]);

        $this->getJson('/api/dashboard')->assertOk()->assertJsonPath('total_urls', 1);

        $this->getJson('/api/dashboard?refresh=1')
            ->assertOk()
            ->assertJsonPath('total_urls', 2);
    }

    public function test_create_and_delete_invalidate_user_cache(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $this->postJson('/api/urls', [
            'original_url' => 'https://created.example',
        ])->assertCreated();

        $this->getJson('/api/dashboard')->assertOk()->assertJsonPath('total_urls', 1);

        $list = $this->getJson('/api/urls')->assertOk();
        $urlId = $list->json('data.0.id');
        $slug = $list->json('data.0.slug');

        Cache::put(CacheKeys::slug($slug), 'stale-slug-cache', CacheKeys::TTL);

        $this->deleteJson("/api/urls/{$urlId}")->assertOk();

        $this->assertNull(Cache::get(CacheKeys::slug($slug)));
        $this->getJson('/api/dashboard')->assertOk()->assertJsonPath('total_urls', 0);
    }

    public function test_url_list_is_cached_until_refresh_or_version_bump(): void
    {
        $user = User::factory()->create();
        Url::query()->create([
            'user_id' => $user->id,
            'original_url' => 'https://example.com/a',
            'slug' => 'list0001',
        ]);

        Sanctum::actingAs($user);

        $this->getJson('/api/urls')->assertOk()->assertJsonCount(1, 'data');

        // Insert direto no banco não invalida o cache da listagem.
        Url::query()->create([
            'user_id' => $user->id,
            'original_url' => 'https://example.com/b',
            'slug' => 'list0002',
        ]);

        $this->getJson('/api/urls')->assertOk()->assertJsonCount(1, 'data');

        $this->getJson('/api/urls?refresh=1')
            ->assertOk()
            ->assertJsonCount(2, 'data');
    }

    public function test_slug_lookup_is_cached_for_redirect(): void
    {
        $user = User::factory()->create();
        Url::query()->create([
            'user_id' => $user->id,
            'original_url' => 'https://example.com',
            'slug' => 'redirect1',
        ]);

        $this->get('/redirect1')->assertRedirect('https://example.com');
        $this->assertNotNull(Cache::get(CacheKeys::slug('redirect1')));

        // Segundo hit usa o modelo em cache e ainda registra o acesso.
        $this->get('/redirect1')->assertRedirect('https://example.com');
        $this->assertDatabaseCount('url_accesses', 2);
    }

    public function test_refresh_on_url_show_forgets_slug_cache(): void
    {
        $user = User::factory()->create();
        $url = Url::query()->create([
            'user_id' => $user->id,
            'original_url' => 'https://example.com',
            'slug' => 'refresh01',
        ]);

        Cache::put(CacheKeys::slug('refresh01'), $url, CacheKeys::TTL);

        Sanctum::actingAs($user);

        $this->getJson("/api/urls/{$url->id}?refresh=1")->assertOk();

        $this->assertNull(Cache::get(CacheKeys::slug('refresh01')));
    }

    public function test_refresh_on_analytics_forgets_dashboard_cache(): void
    {
        $user = User::factory()->create();
        $url = Url::query()->create([
            'user_id' => $user->id,
            'original_url' => 'https://example.com',
            'slug' => 'analytic1',
        ]);

        Cache::put(CacheKeys::dashboard($user->id), [
            'total_urls' => 99,
            'total_clicks' => 0,
            'clicks_today' => 0,
            'last_7_days' => [],
        ], CacheKeys::TTL);

        Sanctum::actingAs($user);

        $this->getJson("/api/urls/{$url->id}/analytics?refresh=1")
            ->assertOk()
            ->assertJsonPath('total_clicks', 0);

        $this->assertNull(Cache::get(CacheKeys::dashboard($user->id)));
    }
}
