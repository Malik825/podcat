import { Component, effect, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MobileAdminMenuComponent } from '../../../shared/components/mobile-admin-menu/mobile-admin-menu.component';
import { Home, Play, List, MessageSquare, Users } from 'lucide-angular';
import { EpisodeService } from '../../../core/services/episode.service';
import { Episode } from '../../../models/episode.model';
import { RouterModule } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { EpisodeCardComponent } from '../../../shared/components/episode-card/episode-card.component';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MobileAdminMenuComponent,
    RouterModule,
    PaginatorModule,
    EpisodeCardComponent,
  ],
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.scss'],
})
export class EpisodesListComponent implements OnInit {
  menuItems = [
    { label: 'Home', icon: Home, route: ['/'] },
    { label: 'Episodes', icon: Play, route: ['/episodes'] },
    { label: 'Playlists', icon: List, route: ['/playlists'] },
    { label: 'Confess', icon: MessageSquare, route: ['/confessions'] },
    { label: 'Team', icon: Users, route: ['/team'] },
  ];

  first = 0;
  rows = 10;

  loading = signal(true);
  error = signal<string | null>(null);

  constructor(public episodeService: EpisodeService) {}

  ngOnInit(): void {
    this.episodeService.getEpisodes().subscribe({
      next: (res: { status: string; data: Episode[] }) => {
        this.episodeService.episodes.set(res.data);
        this.loading.set(false);
      },
      error: (err: unknown) => {
        this.error.set('Failed to load episodes');
        this.loading.set(false);
      },
    });
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }
}
