<?php

namespace App\DTO;

use App\Models\Url;

readonly class RedirectResult
{
    public const TYPE_REDIRECT = 'redirect';

    public const TYPE_PASSWORD_REQUIRED = 'password_required';

    public const TYPE_NOT_FOUND = 'not_found';

    public const TYPE_EXPIRED = 'expired';

    public const TYPE_INVALID_PASSWORD = 'invalid_password';

    public function __construct(
        public string $type,
        public ?string $destination = null,
        public ?Url $url = null,
    ) {}
}
