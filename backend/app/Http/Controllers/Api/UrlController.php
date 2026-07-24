<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Url\StoreUrlRequest;
use App\Services\UrlService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UrlController extends Controller
{
    public function __construct(
        private readonly UrlService $urlService,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $page = max(1, (int) $request->query('page', 1));
        $perPage = min(50, max(1, (int) $request->query('per_page', 10)));

        return response()->json(
            $this->urlService->listForUser(
                $request->user(),
                $page,
                $perPage,
                $request->boolean('refresh'),
            )
        );
    }

    public function show(Request $request, int $url): JsonResponse
    {
        return $this->urlService
            ->getForUser($request->user(), $url, $request->boolean('refresh'))
            ->response();
    }

    public function store(StoreUrlRequest $request): JsonResponse
    {
        $url = $this->urlService->createForUser(
            $request->user(),
            $request->validated(),
        );

        return $url->response()->setStatusCode(201);
    }

    public function destroy(Request $request, int $url): JsonResponse
    {
        $this->urlService->deleteForUser($request->user(), $url);

        return response()->json(['message' => 'URL excluída com sucesso.']);
    }
}
