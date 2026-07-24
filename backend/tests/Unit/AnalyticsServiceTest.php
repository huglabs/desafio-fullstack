<?php

namespace Tests\Unit;

use App\Models\Url;
use App\Models\User;
use App\Repositories\UrlAccessRepository;
use App\Repositories\UrlRepository;
use App\Services\AnalyticsService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AnalyticsServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_builds_last_seven_days_with_zero_fill(): void
    {
        $user = User::factory()->create();
        $url = Url::query()->create([
            'user_id' => $user->id,
            'original_url' => 'https://example.com',
            'slug' => 'unit1234',
        ]);

        app(UrlAccessRepository::class)->create($url->id, '127.0.0.1', 'Agent');

        $service = app(AnalyticsService::class);
        $result = $service->getForUser($user, $url->id);

        $this->assertSame(1, $result['total_clicks']);
        $this->assertCount(7, $result['last_7_days']);
        $this->assertSame(1, collect($result['last_7_days'])->sum('clicks'));
    }
}
