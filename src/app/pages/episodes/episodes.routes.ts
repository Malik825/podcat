import { Routes } from '@angular/router';
import { EpisodeDetailComponent } from './episode-detail/episode-detail.component';
import { EpisodesListComponent } from './episodes-list/episodes-list.component';


export const EPISODES_ROUTES: Routes = [
  {
    path: '',
    component: EpisodesListComponent,
    title: 'All Episodes',
  },
  {
    path: ':id',
    component: EpisodeDetailComponent,
    title: 'Episode Details',
  },
];
