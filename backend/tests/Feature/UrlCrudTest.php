<?php

namespace Tests\Feature;

use App\Models\Url;
use App\Models\User;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UrlCrudTest extends TestCase
{
    public function test_authenticated_user_can_create_url(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/urls', [
            'original_url' => 'https://example.com/page',
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.original_url', 'https://example.com/page')
            ->assertJsonStructure(['data' => ['id', 'slug', 'short_url']]);

        $this->assertDatabaseHas('urls', [
            'user_id' => $user->id,
            'original_url' => 'https://example.com/page',
        ]);
    }

    public function test_create_url_validates_original_url(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/urls', [
            'original_url' => 'not-a-url',
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['original_url'])
            ->assertJsonPath('errors.original_url.0', 'A URL original deve ser válida.');
    }

    public function test_user_can_delete_own_url(): void
    {
        $user = User::factory()->create();
        $url = Url::query()->create([
            'user_id' => $user->id,
            'original_url' => 'https://example.com',
            'slug' => 'delete01',
        ]);

        Sanctum::actingAs($user);

        $this->deleteJson("/api/urls/{$url->id}")
            ->assertOk()
            ->assertJsonPath('message', 'URL excluída com sucesso.');

        $this->assertDatabaseMissing('urls', ['id' => $url->id]);
    }

    public function test_user_cannot_delete_another_users_url(): void
    {
        $owner = User::factory()->create();
        $other = User::factory()->create();
        $url = Url::query()->create([
            'user_id' => $owner->id,
            'original_url' => 'https://example.com',
            'slug' => 'forbid01',
        ]);

        Sanctum::actingAs($other);

        $this->deleteJson("/api/urls/{$url->id}")
            ->assertForbidden()
            ->assertJsonPath('message', 'Sem permissão para excluir esta URL.');

        $this->assertDatabaseHas('urls', ['id' => $url->id]);
    }

    public function test_user_cannot_view_another_users_url(): void
    {
        $owner = User::factory()->create();
        $other = User::factory()->create();
        $url = Url::query()->create([
            'user_id' => $owner->id,
            'original_url' => 'https://example.com',
            'slug' => 'forbid02',
        ]);

        Sanctum::actingAs($other);

        $this->getJson("/api/urls/{$url->id}")
            ->assertForbidden()
            ->assertJsonPath('message', 'Sem permissão para ver esta URL.');
    }

    public function test_list_returns_only_authenticated_users_urls(): void
    {
        $userA = User::factory()->create();
        $userB = User::factory()->create();

        Url::query()->create([
            'user_id' => $userA->id,
            'original_url' => 'https://example.com/a',
            'slug' => 'usera001',
        ]);

        Url::query()->create([
            'user_id' => $userB->id,
            'original_url' => 'https://example.com/b',
            'slug' => 'userb001',
        ]);

        Sanctum::actingAs($userA);

        $this->getJson('/api/urls')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.original_url', 'https://example.com/a');
    }
}
