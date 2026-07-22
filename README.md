# Encurtador de URLs

Serviço de encurtamento de URLs com analytics. Esta fase entrega a estrutura base do projeto e autenticação completa (registro, login, logout).

## Stack

- **Backend:** Laravel 12, Eloquent ORM, Sanctum
- **Frontend:** React, TypeScript, Vite, shadcn/ui, TanStack Query, Zustand, React Hook Form, Zod, Tailwind
- **Banco:** PostgreSQL 16
- **Infra:** Docker Compose

## Pré-requisitos

- [Docker](https://www.docker.com/) e Docker Compose

## Como rodar

```bash
docker compose up --build
```

| Serviço  | URL                        |
| -------- | -------------------------- |
| Frontend | http://localhost:5173      |
| API      | http://localhost:8000/api  |

Na primeira execução, migrations e dependências são instaladas automaticamente.

## Endpoints de auth

| Método | Rota             | Body                                              | Auth  |
| ------ | ---------------- | ------------------------------------------------- | ----- |
| POST   | `/api/register`  | `name`, `email`, `password`, `password_confirmation` | Não   |
| POST   | `/api/login`     | `email`, `password`                               | Não   |
| POST   | `/api/logout`    | —                                                 | Bearer |
| GET    | `/api/me`        | —                                                 | Bearer |

Resposta de login/registro:

```json
{
  "user": { "id": 1, "name": "...", "email": "..." },
  "token": "..."
}
```

## Estrutura

```
backend/                    # API Laravel (MVC + Eloquent)
frontend/src/
  features/
    auth/                   # pages, stores, types, hooks, services
    dashboard/              # pages
  shared/                   # componentes UI e lib compartilhada
docker-compose.yml
```

Rotas de URLs e analytics existem como stub (501) para a próxima fase.

## Próximos passos

- CRUD de URLs com slug automático
- Redirecionamento público `GET /{slug}`
- Tracking de acessos (IP, User-Agent)
- Dashboard e gráfico de analytics

## Trade-offs

- MVC direto nos controllers, sem camada Service/Repository
- Auth no frontend via Zustand + persist; React Query apenas para HTTP
- Token Bearer (Sanctum), sem cookies de sessão SPA
