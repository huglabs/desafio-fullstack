# Backend — API Laravel

API REST do encurtador de URLs. Auth via Sanctum (Bearer). Frontend em [`../frontend`](../frontend).

## Tecnologias

Laravel 12 · Sanctum · Eloquent · PostgreSQL 16 · Redis 7 · Predis

## Como rodar

### Docker (recomendado)

Na raiz do monorepo:

```bash
docker compose up --build
```

API: http://localhost:8000

### Local

Requisitos: PHP 8.2+, Composer, PostgreSQL, Redis.

```bash
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

## Variáveis de ambiente

Copie `.env.example` para `.env`. Principais:

| Variável | Uso |
| -------- | --- |
| `APP_URL` | Base dos links curtos (`{APP_URL}/{slug}`) |
| `DB_*` | Conexão PostgreSQL |
| `CACHE_STORE` | `redis` em produção/dev Docker |
| `REDIS_HOST` | Host Redis (`redis` no Compose) |
| `FRONTEND_URL` | CORS / Sanctum |
| `SANCTUM_TOKEN_EXPIRATION` | Expiração do token Sanctum em minutos (padrão: `1440` = 24h) |

No Docker Compose, essas variáveis já vêm configuradas no serviço `backend`.

## Testes

Com o stack em execução:

```bash
docker compose exec backend php artisan test
```

Container avulso:

```bash
docker compose run --rm --no-deps --entrypoint php backend artisan test
```

Testes usam SQLite em memória e `CACHE_STORE=array` (`phpunit.xml`) — não precisam de Postgres nem Redis.

## Endpoints

### Auth

| Método | Rota | Auth |
| ------ | ---- | ---- |
| POST | `/api/register` | — |
| POST | `/api/login` | — |
| POST | `/api/logout` | Bearer |
| GET | `/api/me` | Bearer |

### URLs e analytics

| Método | Rota | Auth |
| ------ | ---- | ---- |
| GET | `/api/dashboard` | Bearer |
| GET | `/api/urls` | Bearer |
| POST | `/api/urls` | Bearer |
| GET | `/api/urls/{id}` | Bearer |
| DELETE | `/api/urls/{id}` | Bearer |
| GET | `/api/urls/{id}/analytics` | Bearer |

Query params: `page`, `per_page` (listagem); `refresh=1` (invalida cache e lê no banco).

Body `POST /api/urls`: `original_url` (obrigatório), `expires_at` e `password` (opcionais).

Respostas analytics/dashboard usam `snake_case` (`total_clicks`, `last_7_days`, etc.).

### Redirect público

| Método | Rota | Descrição |
| ------ | ---- | --------- |
| GET | `/{slug}` | Redirect ou tela de senha/expirado |
| POST | `/{slug}` | Desbloqueio com senha |

Fluxo: slug → expiração → senha → registra `url_accesses` → redirect 302.

## Cache (Redis)

TTL: **5 minutos**.

| Recurso | Invalidação |
| ------- | ----------- |
| Dashboard | create/delete URL; `?refresh=1` |
| Listagem paginada | create/delete (version key); `?refresh=1` |
| Lookup por slug | delete URL; `?refresh=1` na URL |

## Estrutura

```
app/
  Http/Controllers/Api/
  Http/Requests/
  Http/Resources/
  Models/
  Repositories/
  Services/
  Support/CacheKeys.php
routes/api.php
routes/web.php
tests/
```

## Decisões

- **Service + Repository** para isolar regras de negócio e queries.
- **UrlCacheService** centraliza remember/forget e versionamento de listagens.
- **RedirectController** em `web.php` (HTML para senha/expirado); API JSON em `api.php`.

## Trade-offs

- Tracking síncrono no redirect — sem fila, mais simples.
- Clipes no dashboard podem ficar stale até TTL ou refresh — evita invalidar cache a cada acesso.
- Predis puro PHP — sem dependência de extensão nativa no container.
