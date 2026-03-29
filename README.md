# TurnON — Front-end

Interface Angular 18 para o app de recomendação de músicas.

## Stack
- **Angular 18** — standalone components, signals, `@if/@for` control flow
- **Tailwind CSS 3** — utility-first styling
- **Reactive Forms** — login, registro e criação de playlists
- **HttpClient** com interceptor JWT funcional
- **Guards** (`authGuard` / `guestGuard`) em todas as rotas protegidas

## Requisitos Angular do projeto cobertos

| Requisito | Onde |
|---|---|
| Diretivas nova sintaxe (`@if`, `@for`) | todos os templates |
| `signal()` / `computed()` | `AuthService`, `HomeComponent`, `SongsComponent`, etc. |
| `model()` | `HomeComponent` (selectedGenreIds) |
| `Input` / `Output` | `NavbarComponent` |
| Navegação (Router) | `app.routes.ts` com lazy loading |
| Reactive Forms | Login, Register, PlaylistList |
| `provideHttpClient` | `app.config.ts` |
| Guard | `authGuard`, `guestGuard` |
| Interceptor | `jwtInterceptor` |

## Como rodar

```bash
npm install
ng serve
```

Acesse `http://localhost:4200`. O back-end deve estar rodando em `http://localhost:8080`.
