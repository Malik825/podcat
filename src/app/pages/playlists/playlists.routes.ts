import { Routes } from '@angular/router';
import { PlaylistsComponent } from './playlists/playlists.component';

export const PLAYLISTS_ROUTES: Routes = [
  {
    path: '',
    component: PlaylistsComponent,
    title: 'Playlists',
  },
  {
    path: ':id', // ✅ route for `/playlists/:id`
    component: PlaylistsComponent,
    title: 'Playlist Details',
  }
];
