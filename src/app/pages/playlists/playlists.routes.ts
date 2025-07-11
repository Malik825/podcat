import { Routes } from '@angular/router';
import { PlaylistsComponent } from './playlists/playlists.component';
import { PlaylistDetailsComponent } from '../playlist-details/playlist-details.component';

export const PLAYLISTS_ROUTES: Routes = [
  {
    path: '',
    component: PlaylistsComponent,
    title: 'Playlists',
  },
  {
    path: ':id', // ✅ route for `/playlists/:id`
    component: PlaylistDetailsComponent,
    title: 'Playlist Details',
  },
];
