<?php

namespace Tests\Feature;

use App\Models\User;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AuthTest extends TestCase
{
    public function test_user_can_register_and_receive_token(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertCreated()
            ->assertJsonPath('user.email', 'test@example.com')
            ->assertJsonStructure(['user' => ['id', 'name', 'email'], 'token']);

        $this->assertDatabaseHas('users', ['email' => 'test@example.com']);
    }

    public function test_register_rejects_duplicate_email(): void
    {
        User::factory()->create(['email' => 'dupe@example.com']);

        $response = $this->postJson('/api/register', [
            'name' => 'Another User',
            'email' => 'dupe@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['email']);
    }

    public function test_user_can_login_with_valid_credentials(): void
    {
        User::factory()->create([
            'email' => 'login@example.com',
            'password' => 'password123',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'login@example.com',
            'password' => 'password123',
        ]);

        $response->assertOk()
            ->assertJsonPath('user.email', 'login@example.com')
            ->assertJsonStructure(['token']);
    }

    public function test_login_rejects_invalid_credentials(): void
    {
        User::factory()->create([
            'email' => 'login@example.com',
            'password' => 'password123',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'login@example.com',
            'password' => 'wrong-password',
        ]);

        $response->assertUnauthorized()
            ->assertJsonPath('message', 'Credenciais inválidas.');
    }

    public function test_authenticated_user_can_fetch_profile(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $this->getJson('/api/me')
            ->assertOk()
            ->assertJsonPath('user.id', $user->id)
            ->assertJsonPath('user.email', $user->email);
    }

    public function test_me_requires_authentication(): void
    {
        $this->getJson('/api/me')->assertUnauthorized();
    }

    public function test_logout_revokes_token(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('auth')->plainTextToken;

        $this->withHeader('Authorization', "Bearer {$token}")
            ->postJson('/api/logout')
            ->assertOk()
            ->assertJsonPath('message', 'Logout realizado com sucesso.');

        $this->assertDatabaseCount('personal_access_tokens', 0);
    }

    public function test_login_token_expires_in_24_hours(): void
    {
        User::factory()->create([
            'email' => 'login@example.com',
            'password' => 'password123',
        ]);

        $this->postJson('/api/login', [
            'email' => 'login@example.com',
            'password' => 'password123',
        ])->assertOk();

        $token = User::where('email', 'login@example.com')
            ->firstOrFail()
            ->tokens()
            ->first();

        $this->assertNotNull($token->expires_at);
        $this->assertTrue(
            $token->expires_at->between(now()->addHours(23), now()->addHours(25)),
        );
    }

    public function test_expired_token_returns_unauthorized(): void
    {
        $user = User::factory()->create();
        $tokenResult = $user->createToken('auth');
        $tokenResult->accessToken->forceFill(['expires_at' => now()->subMinute()])->save();

        $this->withHeader('Authorization', 'Bearer '.$tokenResult->plainTextToken)
            ->getJson('/api/me')
            ->assertUnauthorized();
    }
}
