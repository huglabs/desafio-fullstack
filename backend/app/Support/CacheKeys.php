<?php

namespace App\Support;

class CacheKeys
{
    public const TTL = 300;

    public const VERSION_TTL = 86400;

    public static function dashboard(int $userId): string
    {
        return "dashboard:user:{$userId}";
    }

    public static function userUrlsVersion(int $userId): string
    {
        return "urls:user:{$userId}:version";
    }

    public static function userUrls(int $userId, int $version, int $page, int $perPage): string
    {
        return "urls:user:{$userId}:v{$version}:p{$page}:pp{$perPage}";
    }

    public static function slug(string $slug): string
    {
        return "slug:{$slug}";
    }
}
