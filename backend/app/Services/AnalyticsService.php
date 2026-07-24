<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UrlAccessRepository;
use App\Repositories\UrlRepository;
use App\Support\CacheKeys;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Symfony\Component\HttpFoundation\Response;

class AnalyticsService
{
    public function __construct(
        private readonly UrlRepository $urlRepository,
        private readonly UrlAccessRepository $urlAccessRepository,
        private readonly UrlCacheService $urlCacheService,
    ) {}

    public function getDashboardForUser(User $user, bool $refresh = false): array
    {
        $key = CacheKeys::dashboard($user->id);

        return $this->urlCacheService->remember(
            $key,
            fn () => $this->buildDashboardForUser($user),
            $refresh,
        );
    }

    public function getForUser(User $user, int $urlId, bool $refresh = false): array
    {
        $url = $this->urlRepository->findById($urlId);

        if ($url === null) {
            throw new HttpResponseException(
                response()->json(['message' => 'URL não encontrada.'], Response::HTTP_NOT_FOUND)
            );
        }

        if ($url->user_id !== $user->id) {
            throw new HttpResponseException(
                response()->json(['message' => 'Sem permissão para ver analytics desta URL.'], Response::HTTP_FORBIDDEN)
            );
        }

        if ($refresh) {
            $this->urlCacheService->forgetDashboard($user->id);
        }

        $totalClicks = $this->urlAccessRepository->countByUrl($urlId);
        $since = now()->subDays(6)->startOfDay();
        $accesses = $this->urlAccessRepository->getAccessesSince($urlId, $since);

        return [
            'total_clicks' => $totalClicks,
            'last_7_days' => $this->buildLast7Days($accesses),
        ];
    }

    private function buildDashboardForUser(User $user): array
    {
        $totalUrls = $this->urlRepository->countByUser($user->id);
        $totalClicks = $this->urlAccessRepository->countByUser($user->id);
        $clicksToday = $this->urlAccessRepository->countByUserToday($user->id);
        $since = now()->subDays(6)->startOfDay();
        $accesses = $this->urlAccessRepository->getAccessesSinceForUser($user->id, $since);

        return [
            'total_urls' => $totalUrls,
            'total_clicks' => $totalClicks,
            'clicks_today' => $clicksToday,
            'last_7_days' => $this->buildLast7Days($accesses),
        ];
    }

    private function buildLast7Days(Collection $accesses): array
    {
        $countsByDate = [];

        foreach ($accesses as $access) {
            $date = $access->accessed_at->toDateString();
            $countsByDate[$date] = ($countsByDate[$date] ?? 0) + 1;
        }

        $last7Days = [];

        for ($i = 0; $i < 7; $i++) {
            $date = Carbon::today()->subDays(6 - $i)->toDateString();
            $last7Days[] = [
                'date' => $date,
                'clicks' => $countsByDate[$date] ?? 0,
            ];
        }

        return $last7Days;
    }
}
