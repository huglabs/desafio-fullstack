<?php

namespace App\Services;

use App\DTO\RedirectResult;
use App\Models\Url;
use App\Repositories\UrlAccessRepository;
use App\Repositories\UrlRepository;
use App\Support\CacheKeys;
use Illuminate\Support\Facades\Hash;

class RedirectService
{
    public function __construct(
        private readonly UrlRepository $urlRepository,
        private readonly UrlAccessRepository $urlAccessRepository,
        private readonly UrlCacheService $urlCacheService,
    ) {}

    public function handleGet(string $slug, string $ip, string $userAgent): RedirectResult
    {
        $url = $this->findBySlug($slug);

        if ($url === null) {
            return new RedirectResult(RedirectResult::TYPE_NOT_FOUND);
        }

        if ($this->isExpired($url)) {
            return new RedirectResult(RedirectResult::TYPE_EXPIRED, url: $url);
        }

        if ($url->password !== null) {
            return new RedirectResult(RedirectResult::TYPE_PASSWORD_REQUIRED, url: $url);
        }

        return $this->redirectWithTracking($url, $ip, $userAgent);
    }

    public function handleUnlock(string $slug, string $password, string $ip, string $userAgent): RedirectResult
    {
        $url = $this->findBySlug($slug);

        if ($url === null) {
            return new RedirectResult(RedirectResult::TYPE_NOT_FOUND);
        }

        if ($this->isExpired($url)) {
            return new RedirectResult(RedirectResult::TYPE_EXPIRED, url: $url);
        }

        if ($url->password === null || ! Hash::check($password, $url->password)) {
            return new RedirectResult(RedirectResult::TYPE_INVALID_PASSWORD, url: $url);
        }

        return $this->redirectWithTracking($url, $ip, $userAgent);
    }

    private function findBySlug(string $slug): ?Url
    {
        $key = CacheKeys::slug($slug);

        return $this->urlCacheService->remember(
            $key,
            fn () => $this->urlRepository->findBySlug($slug),
        );
    }

    private function redirectWithTracking(Url $url, string $ip, string $userAgent): RedirectResult
    {
        $this->urlAccessRepository->create($url->id, $ip, $userAgent);

        return new RedirectResult(
            RedirectResult::TYPE_REDIRECT,
            destination: $url->original_url,
            url: $url,
        );
    }

    private function isExpired(Url $url): bool
    {
        return $url->expires_at !== null && $url->expires_at->isPast();
    }
}
