## CarParts Project — Overview

A single-page application for browsing and managing car parts. Built with Angular standalone components, it demonstrates routing, authentication, CRUD operations, error handling, and basic mapping integrations (Google Maps and Leaflet).

### Tech stack
- **Framework**: Angular 19 (standalone APIs, strict TypeScript)
- **Router/HTTP**: `@angular/router`, `@angular/common/http`
- **State/Signals**: Angular Signals for auth state
- **UI/Animations**: `@angular/platform-browser/animations`
- **Maps**: `@angular/google-maps`, `leaflet` with `@types/leaflet`
- **RxJS**: 7.8
- **Tooling**: Angular CLI, Karma/Jasmine for tests

### Project structure (high-level)
- `src/app/app.ts`, `app.html`, `app.config.ts`: Root component and application providers
- `src/app/app.routes.ts`: Route configuration (lazy-loaded components)
- `src/app/core/`
  - `services/`: `auth.service.ts`, `part.service.ts`, `comments.service.ts`, `error.service.ts`, etc.
  - `guards/`: `auth.guard.ts`
  - `interceptors/`: `error.interceptor.ts`
- `src/app/features/`: Feature modules as standalone components
  - `home`, `catalog` (board + item), `details`, `create`, `edit`, `auth` (login/register), `my-account`, `about`
- `src/app/shared/components/`: Reusable components
  - `header`, `footer`, `contact`, `error-notification`, `loading-spinner`, `not-found`, `google-maps`, `simple-map`, `leaflet-map`, `pipes`
- `src/app/models/`: Domain models (`part`, `comment`, `user`)
- Assets: `public/` and `Resources/uren/assets/` (mapped to build `assets/`)

### Core functionality
- **Catalog**: List parts, view details
- **Create/Edit Part**: Authorized users can create and edit parts
- **Comments & Ratings**: Add/list/delete comments per part
- **Authentication**: Register, login, logout, account update
- **Account area**: View user-related info/content
- **Error handling**: Global HTTP error interceptor + `ErrorNotification` UI
- **Maps**: Embedded Google Maps and Leaflet examples

### Architecture notes
- Uses Angular standalone components and lazy `loadComponent` routes
- `authGuard` protects `create`, `edit`, and `my-account`
- `ErrorInterceptor` funnels errors to `ErrorService` for UI display
- `AuthService` persists `currentUser` and `accessToken` in `localStorage`
- Services call a local mock backend over HTTP with `X-Authorization` when authenticated

### Backend/API
- Local mock server in `Server/` (SoftUni Practice Server)
- Base URL: `http://localhost:3030`
  - Auth: `POST /users/login`, `POST /users/register`, `POST /users/logout`, `POST /users/update`
  - Parts: `GET/POST/PUT/DELETE /data/parts`
  - Comments: `GET/POST/DELETE /data/comments`
- CORS: enabled by the server

### How to run
Prerequisites: Node.js LTS, npm, and Angular CLI (`npm i -g @angular/cli`).

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
# then open http://localhost:4200/
```

Build and test
```bash
npm run build
npm test
```

### Configuration
- **API endpoints**: Hard-coded in services (`auth.service.ts`, `part.service.ts`, `comments.service.ts`)
- **Google Maps**: See `GOOGLE_MAPS_SETUP.md` for API key setup; component: `shared/components/google-maps`
- **Assets**: Additional static assets copied from `Resources/uren/assets` via `angular.json`

### Key routes
- `/home`, `/catalog`, `/catalog/:id/details`
- `/create` (guarded), `/catalog/:id/edit` (guarded)
- `/login`, `/register`, `/my-account` (guarded)
- `/about`, `/contact`, `/spinner-demo`, fallback `**` → Not Found

### Notes
- Authentication token is stored in `localStorage` as `accessToken`
- Auth header: `X-Authorization: <token>`
- Error messages are surfaced via the `ErrorNotification` component


