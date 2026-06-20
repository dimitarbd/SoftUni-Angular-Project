## Car Parts SPA — Brief Documentation

### Stack
- **Frontend**: Angular 19 (standalone components), TypeScript, RxJS 7.8
- **Routing/HTTP**: `@angular/router`, `@angular/common/http`
- **UI**: Basic CSS, some animations; reusable loading spinners and notifications
- **Maps**: `@angular/google-maps`, `leaflet`
- **Backend (mock)**: Node/Express server in `Server/`

### Features
- Catalog of car parts, details page with rating & comments
- Auth (register, login, logout), guarded routes for create/edit/my-account
- CRUD for parts; comments create/delete
- Global error handling with `ErrorInterceptor` + `ErrorNotification`
- Loading spinners and UX feedback

### Architecture (high-level)
- Angular standalone architecture with lazy `loadComponent` routes (`src/app/app.routes.ts`)
- Core services: `auth.service.ts`, `part.service.ts`, `comments.service.ts`, `error.service.ts`
- Guards: `auth.guard.ts` for protected pages
- Interceptors: `error.interceptor.ts` → funnels messages to `ErrorService`
- Shared reusable UI in `src/app/shared/components/`

### Structure
- Frontend: `carParts-project/`
  - Entry: `src/main.ts`, `src/app/app.ts`, `app.config.ts`, `app.routes.ts`
  - Features: `src/app/features/` (home, catalog, details, create, edit, auth, my-account, about)
  - Shared: `src/app/shared/components/` (header, footer, loading-spinner, error-notification, maps, not-found)
  - Models: `src/app/models/`
- Backend: `Server/` (Express app with routes for users, parts, comments and static images)

### How to run
1) Start backend (port 3030)
```bash
cd Server
npm install
npm start
```
2) Start frontend (port 4200)
```bash
cd carParts-project
npm install
npm start
# open http://localhost:4200/
```

Build/test (frontend)
```bash
cd carParts-project
npm run build
npm test
```

### Configuration notes
- API base: `http://localhost:3030` (hard-coded in `auth.service.ts`, `part.service.ts`, `comments.service.ts`)
- Auth token: stored in `localStorage` as `accessToken`, sent via `X-Authorization`
- Assets: copied from `public/` and `Resources/uren/assets` (see `angular.json` → `assets`)

### Key routes
- `/home`, `/catalog`, `/catalog/:id/details`
- Guarded: `/create`, `/catalog/:id/edit`, `/my-account`
- Auth: `/login`, `/register`
- Misc: `/about`, `/contact`, fallback `**` → Not Found


