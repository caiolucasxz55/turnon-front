import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'songs',
    canActivate: [authGuard],
    loadComponent: () => import('./features/songs/songs.component').then(m => m.SongsComponent),
  },
  {
    path: 'playlists',
    canActivate: [authGuard],
    loadComponent: () => import('./features/playlists/list/playlist-list.component').then(m => m.PlaylistListComponent),
  },
  {
    path: 'playlists/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./features/playlists/detail/playlist-detail.component').then(m => m.PlaylistDetailComponent),
  },
  { path: '**', redirectTo: 'home' },
];
