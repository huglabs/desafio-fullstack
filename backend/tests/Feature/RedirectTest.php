<?php

namespace Tests\Feature;

use App\Models\Url;
use App\Models\User;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class RedirectTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutMiddleware(ValidateCsrfToken::class);
    }

    private function createUrl(array $attributes = []): Url
    {
        $user = User::factory()->create();

        return Url::query()->create(array_merge([
            'user_id' => $user->id,
            'original_url' => 'https://example.com/target',
            'slug' => 'testslug',
        ], $attributes));
    }

    public function test_public_redirect_tracks_access_and_redirects(): void
    {
        $this->createUrl(['slug' => 'abcd1234']);

        $response = $this->get('/abcd1234', [
            'User-Agent' => 'PHPUnit Agent',
        ]);

        $response->assertRedirect('https://example.com/target');

        $this->assertDatabaseHas('url_accesses', [
            'ip' => '127.0.0.1',
            'user_agent' => 'PHPUnit Agent',
        ]);
    }

    public function test_unknown_slug_returns_not_found(): void
    {
        $response = $this->get('/unknown1');

        $response->assertNotFound();
    }

    public function test_expired_url_returns_gone_page(): void
    {
        $this->createUrl([
            'slug' => 'expired1',
            'expires_at' => now()->subDay(),
        ]);

        $response = $this->get('/expired1');

        $response->assertStatus(410);
        $response->assertSee('Este link expirou');
        $response->assertSee('expired1');
    }

    public function test_password_protected_url_shows_form_on_get(): void
    {
        $this->createUrl([
            'slug' => 'locked12',
            'password' => Hash::make('secret'),
        ]);

        $response = $this->get('/locked12');

        $response->assertOk();
        $response->assertSee('Link protegido');
        $this->assertDatabaseCount('url_accesses', 0);
    }

    public function test_password_protected_url_unlocks_with_valid_password(): void
    {
        $this->createUrl([
            'slug' => 'locked12',
            'password' => Hash::make('secret'),
        ]);

        $response = $this->post('/locked12', [
            'password' => 'secret',
        ], [
            'User-Agent' => 'PHPUnit Agent',
        ]);

        $response->assertRedirect('https://example.com/target');
        $this->assertDatabaseCount('url_accesses', 1);
    }

    public function test_password_protected_url_rejects_invalid_password(): void
    {
        $this->createUrl([
            'slug' => 'locked12',
            'password' => Hash::make('secret'),
        ]);

        $response = $this->post('/locked12', [
            'password' => 'wrong-password',
        ]);

        $response->assertOk();
        $response->assertSee('Senha incorreta.');
        $this->assertDatabaseCount('url_accesses', 0);
    }
}
