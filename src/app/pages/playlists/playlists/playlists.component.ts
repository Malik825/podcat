import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MobileAdminMenuComponent } from '../../../shared/components/mobile-admin-menu/mobile-admin-menu.component';
import {
  Home,
  MessageSquare,
  List,
  Play
} from 'lucide-angular';
import { PlaylistService } from '../../../core/services/playlist.service';
import { Playlist } from '../../../models/playlist.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MobileAdminMenuComponent],
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  menuItems = [
    { label: 'Home', icon: Home, route: ['/'] },
    { label: 'Episodes', icon: Play, route: ['/episodes'] },
    { label: 'Playlists', icon: List, route: ['/playlists'] },
    { label: 'Confess', icon: MessageSquare, route: ['/confessions'] }
  ];

  playlist = signal<Playlist | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(
    private playlistService: PlaylistService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const episodeId = Number(this.route.snapshot.paramMap.get('id'));
    if (!episodeId) {
      this.error.set('No episode ID found.');
      this.loading.set(false);
      return;
    }

    this.playlistService.getAll().subscribe({
    next: (res: { status: string; data: { data: Playlist[] } }) => {
  const allPlaylists = res.data.data;

  const match = allPlaylists.find(p => p.episode_id === episodeId);

  if (match) {
    this.playlist.set(match);
  } else {
    this.error.set('No playlist found for this episode.');
  }

  this.loading.set(false);
}
,
      error: () => {
        this.error.set('Failed to fetch playlists.');
        this.loading.set(false);
      }
    });
  }
}
