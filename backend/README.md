# Backend — API Laravel

API REST do encurtador de URLs. Autenticação via Laravel Sanctum (token Bearer). Frontend fica em `../frontend`.

## Stack

- Laravel 12
- Eloquent ORM
- Sanctum
- PostgreSQL

## Como rodar

Preferencialmente pela raiz do monorepo:

```bash
docker compose up --build
```

API em `http://localhost:8000`.

Localmente (com PHP, Composer e PostgreSQL):

```bash
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

## Endpoints

### Auth

| Método | Rota            | Descrição              |
| ------ | --------------- | ---------------------- |
| POST   | `/api/register` | Registro + token       |
| POST   | `/api/login`    | Login + token          |
| POST   | `/api/logout`   | Revoga token (Bearer)  |
| GET    | `/api/me`       | Usuário autenticado    |

### Preparados (stub 501)

| Método | Rota                        |
| ------ | --------------------------- |
| GET    | `/api/urls`                 |
| POST   | `/api/urls`                 |
| DELETE | `/api/urls/{url}`           |
| GET    | `/api/urls/{url}/analytics` |
| GET    | `/{slug}`                   |

## Estrutura

```
app/
  Http/Controllers/Api/   # Auth, Url, Analytics
  Http/Requests/Auth/     # Validação
  Models/                 # User, Url, UrlAccess
routes/api.php
database/migrations/
```

Sem assets Node (Vite/Tailwind): a API é PHP puro; o React vive no `frontend/`.
