#!/bin/sh
set -e

if [ ! -f .env ]; then
  cp .env.example .env
fi

if [ ! -d vendor ] || [ ! -d vendor/laravel/sanctum ]; then
  composer update --no-interaction --prefer-dist
fi

if ! grep -q "APP_KEY=base64:" .env 2>/dev/null; then
  php artisan key:generate --force
fi

php artisan migrate --force

exec php artisan serve --host=0.0.0.0 --port=8000
