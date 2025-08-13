import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./features/home/home').then(m => m.HomeComponent) },
  { path: 'catalog', loadComponent: () => import('./features/catalog/catalog-board/catalog-board').then(m => m.CatalogBoard) },
  { path: 'catalog/:id/details', loadComponent: () => import('./features/details/details').then(m => m.DetailsComponent) },
  { path: 'catalog/:id/edit', loadComponent: () => import('./features/edit/edit').then(m => m.EditComponent), canActivate: [() => import('./core/guards/auth.guard').then(g => g.authGuard)] },
  { path: 'import', loadComponent: () => import('./features/import/import').then(m => m.ImportComponent), canActivate: [() => import('./core/guards/auth.guard').then(g => g.authGuard)] },
  { path: 'about', loadComponent: () => import('./features/about/about').then(m => m.AboutComponent) },
  { path: 'contact', loadComponent: () => import('./features/contact/contact').then(m => m.ContactComponent) },
  { path: 'login', loadComponent: () => import('./features/login/login').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./features/auth/register/register').then(m => m.RegisterComponent) },
  { path: 'my-account', loadComponent: () => import('./features/my-account/my-account').then(m => m.MyAccountComponent), canActivate: [() => import('./core/guards/auth.guard').then(g => g.authGuard)] },
];
