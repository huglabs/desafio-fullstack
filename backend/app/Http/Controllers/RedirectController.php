<?php

namespace App\Http\Controllers;

use App\DTO\RedirectResult;
use App\Services\RedirectService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\View\View;

class RedirectController extends Controller
{
    public function __construct(
        private readonly RedirectService $redirectService,
    ) {}

    public function show(Request $request, string $slug): RedirectResponse|View|JsonResponse|Response
    {
        $result = $this->redirectService->handleGet(
            $slug,
            $request->ip() ?? '0.0.0.0',
            $request->userAgent() ?? '',
        );

        return $this->respond($result);
    }

    public function unlock(Request $request, string $slug): RedirectResponse|View|JsonResponse|Response
    {
        $request->validate([
            'password' => ['required', 'string'],
        ]);

        $result = $this->redirectService->handleUnlock(
            $slug,
            $request->input('password'),
            $request->ip() ?? '0.0.0.0',
            $request->userAgent() ?? '',
        );

        if ($result->type === RedirectResult::TYPE_INVALID_PASSWORD) {
            return view('redirect.password', [
                'slug' => $slug,
                'error' => 'Senha incorreta.',
            ]);
        }

        return $this->respond($result);
    }

    private function respond(RedirectResult $result): RedirectResponse|View|JsonResponse|Response
    {
        return match ($result->type) {
            RedirectResult::TYPE_REDIRECT => redirect()->away($result->destination),
            RedirectResult::TYPE_PASSWORD_REQUIRED => view('redirect.password', [
                'slug' => $result->url?->slug,
                'error' => null,
            ]),
            RedirectResult::TYPE_NOT_FOUND => response()->json(['message' => 'URL não encontrada.'], 404),
            RedirectResult::TYPE_EXPIRED => response()->view('redirect.expired', [
                'slug' => $result->url?->slug,
                'expiresAt' => $result->url?->expires_at?->format('d/m/Y H:i'),
                'frontendUrl' => rtrim((string) env('FRONTEND_URL', 'http://localhost:5173'), '/'),
            ], 410),
            default => response()->json(['message' => 'Não foi possível acessar esta URL.'], 400),
        };
    }
}
