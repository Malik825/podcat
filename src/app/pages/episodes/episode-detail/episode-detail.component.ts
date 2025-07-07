import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EpisodeService } from '../../../core/services/episode.service';
import { Episode } from '../../../models/episode.model';
import { MobileAdminMenuComponent } from '../../../shared/components/mobile-admin-menu/mobile-admin-menu.component';
import {
  Home,
  Play,
  List,
  MessageSquare
} from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
   imports: [
    CommonModule,
    RouterModule // ✅ Add this
  ],
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss']
})
export class EpisodeDetailComponent implements OnInit {
  menuItems = [
    { label: 'Home', icon: Home, route: ['/'] },
    { label: 'Episodes', icon: Play, route: ['/episodes'] },
    { label: 'Playlists', icon: List, route: ['/playlists'] },
    { label: 'Confess', icon: MessageSquare, route: ['/confessions'] }
  ];

  episode = signal<Episode | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private route: ActivatedRoute, private episodeService: EpisodeService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Or use slug if your API supports it

    if (id) {
      this.episodeService.getEpisode(id).subscribe({
        next: (res: { status: string; data: Episode }) => {
          this.episode.set(res.data);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Episode not found');
          this.loading.set(false);
        }
      });
    } else {
      this.error.set('Invalid episode ID');
      this.loading.set(false);
    }
  }
}
