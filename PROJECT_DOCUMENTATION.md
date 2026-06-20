## Car Parts SPA — Brief Documentation

### Overview
Single-page application for browsing and managing car parts. The app demonstrates Angular standalone architecture, routing, authentication, CRUD operations, comments/ratings, error handling, and basic mapping integrations (Google Maps and Leaflet). A lightweight Node/Express server acts as a local mock backend.

### Tech stack
- **Framework**: Angular 19 (standalone APIs, strict TypeScript)
- **Routing/HTTP**: `@angular/router`, `@angular/common/http`
- **State**: Angular Signals for auth/error state
- **UI/Animations**: Angular animations + custom CSS
- **Maps**: `@angular/google-maps`, `leaflet` (`@types/leaflet`)
- **RxJS**: 7.8
- **Tooling**: Angular CLI, Karma/Jasmine
- **Backend**: Node/Express (`Server/`)

### Project structure (high-level)
- `carParts-project/`
  - `src/app/app.ts`, `app.html`, `app.css`: Root component
  - `src/app/app.config.ts`: Providers (router, HTTP, interceptors)
  - `src/app/app.routes.ts`: Route configuration with lazy `loadComponent`
  - `src/app/core/`
    - `services/`: `auth.service.ts`, `part.service.ts`, `comments.service.ts`, `error.service.ts`, etc.
    - `guards/`: `auth.guard.ts`
    - `interceptors/`: `error.interceptor.ts`
  - `src/app/features/`: Standalone feature components
    - `home`, `catalog` (board + item), `details`, `create`, `edit`, `auth` (login/register), `my-account`, `about`
  - `src/app/shared/components/`: Reusable UI
    - `header`, `footer`, `contact`, `error-notification`, `loading-spinner`, `not-found`, `google-maps`, `simple-map`, `leaflet-map`, `pipes`
  - `src/app/models/`: `part`, `comment`, `user`
  - Assets: `public/` and `Resources/uren/assets/` (mapped to build `assets/` via `angular.json`)
- `Server/`: Local mock backend (Express)

### Core functionality
- **Catalog**: list parts and view detail pages
- **Create/Edit Part** (guarded): authorized users can manage parts
- **Comments & Ratings** per part (add/list/delete)
- **Authentication**: register, login, logout, account update (token persisted)
- **Error handling**: global HTTP error interceptor + `ErrorNotification` UI
- **Account area**: View user-related info/content
- Loading spinners and UX feedback for async actions
- **Mapping examples**: Google Maps and Leaflet

### Architecture notes
- Angular standalone components (no NgModules) with lazy `loadComponent` routes
- `authGuard` protects `create`, `edit`, and `my-account`
- `ErrorInterceptor` normalizes backend errors to user-friendly messages via `ErrorService`
- `AuthService` persists `currentUser` and `accessToken` in `localStorage`
- Services call a local mock backend over HTTP with `X-Authorization` when authenticated

### Backend/API
- Local mock server in `Server/` (SoftUni Practice Server)
- Base URL: `http://localhost:3030`
  - Auth: `POST /users/login`, `POST /users/register`, `POST /users/logout`, `POST /users/update`
  - Parts: `GET/POST/PUT/DELETE /data/parts`
  - Comments: `GET/POST/DELETE /data/comments`
- CORS is enabled; static images are served for local assets referenced by `/images/...`

### How to run
Prerequisites: Node.js LTS, npm, Angular CLI (`npm i -g @angular/cli`).

1) Start the backend (port 3030)
```bash
cd Server
npm install
npm start
```

2) Start the frontend (port 4200)
```bash
cd carParts-project
npm install
npm start
# open `http://localhost:4200/`
```

Build and test (frontend)
```bash
cd carParts-project
npm run build
npm test
```

### Configuration
- API endpoints are defined in services: `auth.service.ts`, `part.service.ts`, `comments.service.ts`
- Auth header: `X-Authorization: <token>` (token stored in `localStorage` as `accessToken`)
- Assets: copied from `public/` and `Resources/uren/assets/` per `angular.json` → `assets`
- Maps: see `shared/components/leaflet-map` for usage and required API key setup

### Key routes
- `/home`, `/catalog`, `/catalog/:id/details`
- Guarded: `/create`, `/catalog/:id/edit`, `/my-account`
- Auth: `/login`, `/register`
- Misc: `/about`, `/contact`, `/spinner-demo`, fallback `**` → Not Found

### Notes
- Errors are surfaced globally via `ErrorNotification` with robust message extraction
- Local images reduce third‑party cookie warnings; proxy or self-host external images when possible
- Authentication token is stored in `localStorage` as `accessToken`


