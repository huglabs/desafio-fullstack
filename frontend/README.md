# Frontend — SPA React

Interface do encurtador de URLs. Consome a API Laravel via Bearer token.

## Tecnologias

React 19 · TypeScript · Vite · Tailwind 4 · shadcn/ui · TanStack Query · Zustand · React Hook Form · Zod · Vitest

## Como rodar

### Docker (recomendado)

Na raiz do monorepo:

```bash
docker compose up --build
```

App: http://localhost:5173

### Local

Requisitos: Node 20+.

```bash
npm install
VITE_API_URL=http://localhost:8000/api npm run dev
```

O backend precisa estar rodando na URL da API.

## Variáveis de ambiente

| Variável | Descrição | Padrão |
| -------- | --------- | ------ |
| `VITE_API_URL` | Base da API REST | `http://localhost:8000/api` |

No Docker Compose, já vem definida no serviço `frontend`.

## Scripts

```bash
npm run dev       # desenvolvimento
npm run build     # build de produção
npm run test      # testes (Vitest)
npm run test:watch
npm run lint
```

## Telas

| Rota | Descrição |
| ---- | --------- |
| `/auth` | Login e registro |
| `/dashboard` | Home — resumo de URLs e cliques |
| `/urls` | Listagem paginada + criar URL |
| `/urls/:id` | Detalhes, analytics e copiar link |
| `/me` | Perfil do usuário |

## Estrutura

```
src/
  features/
    auth/       # login, registro, perfil
    home/       # dashboard (home)
    urls/       # CRUD, analytics, paginação
  shared/
    components/ # UI shadcn, layout, sidebar
    design-token/
    lib/        # api, utils
  test/feature/ # testes por feature
```

Regras de ownership: componente pertence à **feature** ou ao **shared**. Ver [`AGENT.md`](./AGENT.md).

## Decisões

- **TanStack Query** para dados remotos; **Zustand** (persist) só para auth/token.
- **React Hook Form + Zod** em todos os formulários.
- **Feature folders** — cada domínio com pages, hooks, services e types próprios.
- Botão **Atualizar** na home e nos detalhes da URL chama a API com `?refresh=1`.

## Trade-offs

- Token no localStorage — simples para o desafio; produção pode exigir outra estratégia.
- Sem SSR — SPA pura, adequada ao escopo.
- Gráficos com Recharts — suficiente para analytics de 7 dias sem overengineering.

## Testes

```bash
npm run test
```

Testes em `src/test/feature/`, espelhando a estrutura de features.
