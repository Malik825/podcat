import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { EpisodeService } from '../../../core/services/episode.service';
import { Episode } from '../../../models/episode.model';
import { MobileAdminMenuComponent } from '../../../shared/components/mobile-admin-menu/mobile-admin-menu.component';
import { Home, Play, List, MessageSquare } from 'lucide-angular';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MobileAdminMenuComponent,
    HeaderComponent,
  ],
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss'],
})
export class EpisodeDetailComponent implements OnInit {
  menuItems = [
    { label: 'Home', icon: Home, route: ['/'] },
    { label: 'Episodes', icon: Play, route: ['/episodes'] },
    { label: 'Playlists', icon: List, route: ['/playlists'] },
    { label: 'Confess', icon: MessageSquare, route: ['/confessions'] },
  ];

  episode = signal<Episode | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private episodeService: EpisodeService
  ) {}

  ngOnInit(): void {
    const idOrSlug = this.route.snapshot.paramMap.get('id');
    console.log('[EpisodeDetail] Route param:', idOrSlug);

    if (idOrSlug) {
      console.log('[EpisodeDetail] Fetching episode from API...');
      this.episodeService.getEpisodes().subscribe({
        next: (res) => {
          const episode = res.data.find((ep) => ep.id === Number(idOrSlug));
          if (episode) {
            this.episode.set(episode);
          } else {
            this.error.set('Episode not found');
          }
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Failed to fetch episodes');
          this.loading.set(false);
        },
      });
    } else {
      console.warn('[EpisodeDetail] No valid ID or slug found in route.');
      this.error.set('Invalid episode ID');
      this.loading.set(false);
    }
  }
}
