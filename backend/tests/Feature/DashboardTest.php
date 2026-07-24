<?php

namespace Tests\Feature;

use App\Models\Url;
use App\Models\UrlAccess;
use App\Models\User;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    public function test_authenticated_user_can_fetch_dashboard_summary(): void
    {
        $user = User::factory()->create();
        $url = Url::query()->create([
            'user_id' => $user->id,
            'original_url' => 'https://example.com',
            'slug' => 'dash1234',
        ]);

        UrlAccess::query()->create([
            'url_id' => $url->id,
            'ip' => '127.0.0.1',
            'user_agent' => 'Agent',
            'accessed_at' => now(),
        ]);

        Sanctum::actingAs($user);

        $response = $this->getJson('/api/dashboard');

        $response->assertOk()
            ->assertJsonPath('total_urls', 1)
            ->assertJsonPath('total_clicks', 1)
            ->assertJsonPath('clicks_today', 1)
            ->assertJsonCount(7, 'last_7_days')
            ->assertJsonStructure([
                'total_urls',
                'total_clicks',
                'clicks_today',
                'last_7_days' => [
                    ['date', 'clicks'],
                ],
            ]);
    }
}
