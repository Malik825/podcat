import { Component, effect, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MobileAdminMenuComponent } from '../../../shared/components/mobile-admin-menu/mobile-admin-menu.component';
import { Home, Play, List, MessageSquare, Users } from 'lucide-angular';
import { EpisodeService } from '../../../core/services/episode.service';
import { Episode } from '../../../models/episode.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    // MobileAdminMenuComponent,
    RouterModule,
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

  // ✅ Signals
  episodes = signal<Episode[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private episodeService: EpisodeService) {}

  ngOnInit(): void {
    this.episodeService.getEpisodes().subscribe({
      next: (res: { status: string; data: Episode[] }) => {
        this.episodes.set(res.data);
        this.loading.set(false);
      },
      error: (err: unknown) => {
        this.error.set('Failed to load episodes');
        this.loading.set(false);
      },
    });
  }
}
