<?php

namespace Tests\Feature;

use App\Models\Url;
use App\Models\UrlAccess;
use App\Models\User;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AnalyticsTest extends TestCase
{
    private function createOwnedUrl(User $user): Url
    {
        return Url::query()->create([
            'user_id' => $user->id,
            'original_url' => 'https://example.com',
            'slug' => 'analytics',
        ]);
    }

    public function test_owner_can_fetch_analytics_payload(): void
    {
        $user = User::factory()->create();
        $url = $this->createOwnedUrl($user);

        UrlAccess::query()->create([
            'url_id' => $url->id,
            'ip' => '127.0.0.1',
            'user_agent' => 'Agent',
            'accessed_at' => now()->subDays(1),
        ]);

        UrlAccess::query()->create([
            'url_id' => $url->id,
            'ip' => '127.0.0.2',
            'user_agent' => 'Agent',
            'accessed_at' => now(),
        ]);

        Sanctum::actingAs($user);

        $response = $this->getJson("/api/urls/{$url->id}/analytics");

        $response->assertOk()
            ->assertJsonPath('total_clicks', 2)
            ->assertJsonCount(7, 'last_7_days')
            ->assertJsonStructure([
                'total_clicks',
                'last_7_days' => [
                    ['date', 'clicks'],
                ],
            ]);
    }

    public function test_other_user_cannot_fetch_analytics(): void
    {
        $owner = User::factory()->create();
        $other = User::factory()->create();
        $url = $this->createOwnedUrl($owner);

        Sanctum::actingAs($other);

        $response = $this->getJson("/api/urls/{$url->id}/analytics");

        $response->assertForbidden();
    }
}
