# Encurtador de URLs

Serviço de encurtamento de URLs com autenticação, analytics e redirect público. Atende ao [desafio técnico](./CHALLENGE_URL_SHORTENER.md).

## Tecnologias utilizadas

| Camada   | Stack                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------ |
| Backend  | Laravel 12, Sanctum, Eloquent, PostgreSQL 16, Redis 7, Predis                                    |
| Frontend | React 19, TypeScript, Vite, Tailwind 4, shadcn/ui, TanStack Query, Zustand, React Hook Form, Zod |
| Infra    | Docker Compose                                                                                   |

## Como rodar

### Tudo com Docker (recomendado)

```bash
docker compose up --build
```

| Serviço  | URL                          |
| -------- | ---------------------------- |
| Frontend | http://localhost:5173        |
| API      | http://localhost:8000/api    |
| Redirect | http://localhost:8000/{slug} |

Na primeira execução, dependências, `.env` e migrations rodam automaticamente.

### Backend

Com Docker (stack já em execução):

```bash
docker compose up backend
```

API em http://localhost:8000.

Localmente (PHP 8.2+, Composer, PostgreSQL e Redis):

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

Ajuste `DB_*` e `REDIS_*` no `.env` para o seu ambiente.

### Frontend

Com Docker (stack já em execução):

```bash
docker compose up frontend
```

App em http://localhost:5173.

Localmente (Node 20+):

```bash
cd frontend
npm install
cp .env.example .env   # se existir; senão use VITE_API_URL abaixo
VITE_API_URL=http://localhost:8000/api npm run dev
```

O backend precisa estar acessível na URL configurada em `VITE_API_URL`.

## Variáveis de ambiente

### Backend (`backend/.env`)

| Variável                      | Descrição                      | Padrão (Docker)         |
| ----------------------------- | ------------------------------ | ----------------------- |
| `APP_URL`                     | URL base da API (links curtos) | `http://localhost:8000` |
| `DB_CONNECTION`               | Driver do banco                | `pgsql`                 |
| `DB_HOST`                     | Host PostgreSQL                | `postgres`              |
| `DB_DATABASE`                 | Nome do banco                  | `url_shortener`         |
| `DB_USERNAME` / `DB_PASSWORD` | Credenciais                    | `postgres` / `postgres` |
| `CACHE_STORE`                 | Driver de cache                | `redis`                 |
| `REDIS_HOST`                  | Host Redis                     | `redis`                 |
| `REDIS_CLIENT`                | Cliente Redis                  | `predis`                |
| `FRONTEND_URL`                | Origem do SPA (CORS/Sanctum)   | `http://localhost:5173` |
| `SANCTUM_STATEFUL_DOMAINS`    | Domínios stateful              | `localhost:5173`        |

### Frontend

| Variável       | Descrição        | Padrão                      |
| -------------- | ---------------- | --------------------------- |
| `VITE_API_URL` | Base da API REST | `http://localhost:8000/api` |

## Funcionalidades

- Auth: registro, login, logout (Sanctum Bearer)
- CRUD de URLs com slug automático e único
- Redirect público `GET /{slug}` com tracking (IP, User-Agent, timestamp)
- Analytics por URL e dashboard da home (cliques + últimos 7 dias)
- Expiração opcional e proteção por senha
- Paginação na listagem de URLs
- Cache Redis (TTL 5 min) com botão **Atualizar** na home e nos detalhes da URL

## Testes

```bash
# Backend
docker compose exec backend php artisan test

# Frontend
cd frontend && npm run test
```

## Decisões arquiteturais

- **Backend em camadas (Controller → Service → Repository):** controllers finos, regras de negócio nos services e acesso a dados nos repositories. Validação centralizada em Form Requests; 
- **Autenticação Bearer (Sanctum):** token no header, sem sessão/cookie no SPA — encaixa bem no monorepo com API e frontend separados e simplifica o deploy.
- **Cache Redis com version key na listagem:** dashboard, listagem paginada e lookup por slug (TTL 5 min). Create/delete incrementa a versão do usuário e invalida todas as páginas sem `SCAN` no Redis; botão Atualizar usa `?refresh=1`.
- **Frontend por features + shared:** domínios `auth`, `home` e `urls`, com UI reutilizável em `shared`. Auth e token no Zustand (persist); leitura/escrita de API no TanStack Query, com invalidação após mutations.
- **Rotas separadas por responsabilidade:** JSON REST em `routes/api.php`; redirect público, senha e página de expirado em `routes/web.php` (Blade), onde HTML faz mais sentido que JSON.

## Estrutura do repositório

```
backend/          # API Laravel
frontend/         # SPA React
docker-compose.yml
CHALLENGE_URL_SHORTENER.md
```

Documentação detalhada: [`backend/README.md`](./backend/README.md) e [`frontend/README.md`](./frontend/README.md).
