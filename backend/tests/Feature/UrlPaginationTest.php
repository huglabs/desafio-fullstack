<?php

namespace Tests\Feature;

use App\Models\Url;
use App\Models\User;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UrlPaginationTest extends TestCase
{
    public function test_urls_are_paginated(): void
    {
        $user = User::factory()->create();

        for ($i = 0; $i < 15; $i++) {
            Url::query()->create([
                'user_id' => $user->id,
                'original_url' => "https://example.com/{$i}",
                'slug' => "slug{$i}ab",
            ]);
        }

        Sanctum::actingAs($user);

        $response = $this->getJson('/api/urls?page=1&per_page=10');

        $response->assertOk()
            ->assertJsonCount(10, 'data')
            ->assertJsonPath('meta.current_page', 1)
            ->assertJsonPath('meta.per_page', 10)
            ->assertJsonPath('meta.total', 15)
            ->assertJsonPath('meta.last_page', 2);

        $pageTwo = $this->getJson('/api/urls?page=2&per_page=10');

        $pageTwo->assertOk()
            ->assertJsonCount(5, 'data')
            ->assertJsonPath('meta.current_page', 2);
    }

    public function test_owner_can_fetch_single_url(): void
    {
        $user = User::factory()->create();
        $url = Url::query()->create([
            'user_id' => $user->id,
            'original_url' => 'https://example.com',
            'slug' => 'single12',
        ]);

        Sanctum::actingAs($user);

        $this->getJson("/api/urls/{$url->id}")
            ->assertOk()
            ->assertJsonPath('data.slug', 'single12');
    }
}
