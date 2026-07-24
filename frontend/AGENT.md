# Frontend — Guia para agentes

## Stack

React 19, TypeScript, Vite, Tailwind 4, shadcn/ui (new-york), TanStack Query, Zustand, React Hook Form, Zod, Lucide.

## Ownership de componentes (obrigatório)

**Todo componente pertence à sua feature ou a `shared`. Não há terceira opção.**

| Onde                             | O quê                                                          |
| -------------------------------- | -------------------------------------------------------------- |
| `features/<feature>/components/` | UI usada só (ou principalmente) por aquela feature             |
| `shared/components/`             | UI reutilizada por 2+ features (layout, StatCard, ThemeToggle) |
| `shared/components/ui/`          | Primitives shadcn                                              |

Regras:

- A página de uma feature **não** importa componentes de outra feature para UI “daquela página”. Extraia para a feature dona da tela ou para `shared`.
- Exceção válida: **compor** um domínio alheio via componentes públicos dessa feature (ex.: `home` usa `UrlDataTable` / `CreateUrlDialog` de `urls`, porque o domínio é URLs).
- Não deixe componentes “órfãos” em `urls` se só a home os usa (ex.: gráfico mock da home → `features/home`).
- Hooks/services/types seguem a mesma regra de ownership.

## Estrutura de pastas

```
src/
  features/<feature>/
    components/
    hooks/
    pages/
    services/
    types/
    data/              # mocks / fixtures da feature
  shared/
    components/ui/     # shadcn primitives
    components/layout/ # shells, sidebar
    components/        # PageHeader, RefreshButton, StatCard
    types/             # tipos compartilhados (ex.: AnalyticsDay)
    design-token/      # tokens TS (CSS em index.css)
    lib/
    stores/
  test/
    setup.ts
    feature/
      auth/
      home/
      urls/
      shared/          # libs/UI compartilhadas
```

Cada feature expõe páginas e lógica própria; não duplicar UI genérica fora de `shared/`.

Testes ficam em `src/test/feature/<feature>/`, espelhando a ownership da feature.

## Convenções de código

- **Pages:** só composição de layout e componentes; lógica em hooks.
- **Hooks:** prefixo `is` para loading (`isUrlLoading`, `isAnalyticsLoading`); handlers com verbo (`handleRefresh`, `copyLink`).
- **Props:** substantivos claros (`url`, `analytics`), evitar `data` genérico.
- **Tipos da API:** espelham `snake_case` do backend (`total_clicks`, `last_7_days`).
- **Componentes shared:** `PageHeader`, `RefreshButton` — reutilizar em páginas autenticadas.

## Design system

- **Fonte de verdade de cores:** [`src/index.css`](src/index.css) (`:root` e `.dark`, oklch verde ~145–155).
- **Tokens TS:** [`src/shared/design-token/`](src/shared/design-token/) — usar em charts/docs; preferir classes Tailwind (`bg-primary`, `text-muted-foreground`) no JSX.
- **Fontes:** Plus Jakarta Sans (corpo e títulos).
- **Radius:** `--radius: 0.875rem`; cards e inputs com `rounded-xl`.
- **Superfícies autenticadas:** `auth-shell` + `auth-grid` para fundo; cards com `border-border/70 bg-card/80 backdrop-blur-xl`.
- **Modo claro é padrão;** respeitar `.dark` via `themeStore`.

Não introduzir paletas roxas, Inter/Roboto como display, ou cards pesados no hero.

## Componentes UI

- Adicionar via shadcn CLI em `@/shared/components/ui`.
- Compor features a partir desses primitives; variantes com `class-variance-authority` + `cn()`.

## Formulários

- React Hook Form + Zod (`@hookform/resolvers/zod`).
- Schemas em `features/<feature>/types/schemas.ts`.
- Erros de API: `parseApiError` + toast Sonner + `FormMessage` por campo.

## Data fetching

- Axios em `shared/lib/api.ts` (Bearer do `authStore`).
- React Query: services finos, hooks com `useQuery` / `useMutation`.
- Invalidar query keys após mutations (`['urls']`, etc.).

## Feedback UX

- **Toast:** Sonner (`toast.success` / `toast.error`).
- **Loading:** Skeleton para listas/cards; `disabled` + texto no botão em mutations.
- **Exclusão:** sempre `AlertDialog` de confirmação.
- **Empty states:** mensagem clara + CTA quando aplicável.

## Layout autenticado

- `DashboardLayout`: sidebar expansível, nav + rodapé com perfil (`/me`) e logout.
- Auth (login/registro): `AppShell` centralizado.

## Rotas

Definidas em `App.tsx`; rotas protegidas dentro de `ProtectedRoute` + `DashboardLayout`.
