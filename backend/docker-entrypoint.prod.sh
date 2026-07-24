#!/bin/sh
set -e

php artisan migrate --force
php artisan config:cache
php artisan route:cache

PORT="${PORT:-8000}"

exec php artisan serve --host=0.0.0.0 --port="$PORT"
