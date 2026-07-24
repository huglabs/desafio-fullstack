<?php

namespace Tests\Unit;

use App\DTO\RedirectResult;
use App\Models\Url;
use App\Models\User;
use App\Repositories\UrlAccessRepository;
use App\Repositories\UrlRepository;
use App\Services\RedirectService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class RedirectServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_handle_get_redirects_public_url(): void
    {
        $user = User::factory()->create();
        Url::query()->create([
            'user_id' => $user->id,
            'original_url' => 'https://example.com',
            'slug' => 'public12',
        ]);

        $service = app(RedirectService::class);
        $result = $service->handleGet('public12', '10.0.0.1', 'Agent');

        $this->assertSame(RedirectResult::TYPE_REDIRECT, $result->type);
        $this->assertSame('https://example.com', $result->destination);
        $this->assertDatabaseCount('url_accesses', 1);
    }

    public function test_handle_unlock_requires_valid_password(): void
    {
        $user = User::factory()->create();
        Url::query()->create([
            'user_id' => $user->id,
            'original_url' => 'https://example.com',
            'slug' => 'locked12',
            'password' => Hash::make('secret'),
        ]);

        $service = app(RedirectService::class);

        $invalid = $service->handleUnlock('locked12', 'wrong', '10.0.0.1', 'Agent');
        $valid = $service->handleUnlock('locked12', 'secret', '10.0.0.1', 'Agent');

        $this->assertSame(RedirectResult::TYPE_INVALID_PASSWORD, $invalid->type);
        $this->assertSame(RedirectResult::TYPE_REDIRECT, $valid->type);
        $this->assertDatabaseCount('url_accesses', 1);
    }
}
