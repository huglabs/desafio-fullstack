<?php

namespace App\Services;

use App\Http\Resources\UrlResource;
use App\Models\User;
use App\Repositories\UrlRepository;
use App\Support\CacheKeys;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class UrlService
{
    public function __construct(
        private readonly UrlRepository $urlRepository,
        private readonly UrlCacheService $urlCacheService,
    ) {}

    public function listForUser(User $user, int $page = 1, int $perPage = 10, bool $refresh = false): array
    {
        $version = $this->urlCacheService->getUserUrlsVersion($user->id);
        $key = CacheKeys::userUrls($user->id, $version, $page, $perPage);

        return $this->urlCacheService->remember(
            $key,
            function () use ($user, $page, $perPage) {
                $urls = $this->urlRepository->paginateByUser($user->id, $perPage, $page);

                return UrlResource::collection($urls)->response()->getData(true);
            },
            $refresh,
        );
    }

    public function getForUser(User $user, int $urlId, bool $refresh = false): UrlResource
    {
        $url = $this->urlRepository->findById($urlId);

        if ($url === null) {
            throw new HttpResponseException(
                response()->json(['message' => 'URL não encontrada.'], Response::HTTP_NOT_FOUND)
            );
        }

        if ($url->user_id !== $user->id) {
            throw new HttpResponseException(
                response()->json(['message' => 'Sem permissão para ver esta URL.'], Response::HTTP_FORBIDDEN)
            );
        }

        if ($refresh) {
            $this->urlCacheService->forgetSlug($url->slug);
        }

        return new UrlResource($url);
    }

    public function createForUser(User $user, array $data): UrlResource
    {
        $url = $this->urlRepository->create([
            'user_id' => $user->id,
            'original_url' => $data['original_url'],
            'slug' => $this->generateUniqueSlug(),
            'expires_at' => $data['expires_at'] ?? null,
            'password' => $data['password'] ?? null,
        ]);

        $this->urlCacheService->forgetForUser($user->id);

        return new UrlResource($url);
    }

    public function deleteForUser(User $user, int $urlId): void
    {
        $url = $this->urlRepository->findById($urlId);

        if ($url === null) {
            throw new HttpResponseException(
                response()->json(['message' => 'URL não encontrada.'], Response::HTTP_NOT_FOUND)
            );
        }

        if ($url->user_id !== $user->id) {
            throw new HttpResponseException(
                response()->json(['message' => 'Sem permissão para excluir esta URL.'], Response::HTTP_FORBIDDEN)
            );
        }

        $slug = $url->slug;

        $this->urlRepository->delete($url);

        $this->urlCacheService->forgetForUser($user->id);
        $this->urlCacheService->forgetSlug($slug);
    }

    private function generateUniqueSlug(): string
    {
        do {
            $slug = Str::lower(Str::random(8));
        } while ($this->urlRepository->slugExists($slug));

        return $slug;
    }
}
