import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./admin-dashboard/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent
          ),
      },
      {
        path: 'confessions',
        loadComponent: () =>
          import('./admin-confessions/admin-confessions.component').then(
            (m) => m.AdminConfessionsComponent
          ),
      },

      // ✅ Playlists
      {
        path: 'playlists',
        loadComponent: () =>
          import('./admin-playlists/admin-playlists.component').then(
            (m) => m.AdminPlaylistsComponent
          ),
      },
      {
        path: 'playlists/new',
        loadComponent: () =>
          import('./admin-playlist-form/admin-playlist-form.component').then(
            (m) => m.AdminPlaylistFormComponent
          ),
      },
      {
        path: 'playlists/:id/edit',
        loadComponent: () =>
          import('./admin-playlist-form/admin-playlist-form.component').then(
            (m) => m.AdminPlaylistFormComponent
          ),
      },

      // ✅ Team
      {
        path: 'team',
        loadComponent: () =>
          import('./admin-team/admin-team.component').then(
            (m) => m.AdminTeamComponent
          ),
      },
      {
        path: 'team/new',
        loadComponent: () =>
          import('./admin-team-form/admin-team-form.component').then(
            (m) => m.AdminTeamFormComponent
          ),
      },
      {
        path: 'team/:id/edit',
        loadComponent: () =>
          import('./admin-team-form/admin-team-form.component').then(
            (m) => m.AdminTeamFormComponent
          ),
      }
    ]
  }
];
