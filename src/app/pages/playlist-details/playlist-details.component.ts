import { Component, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Home, MessageSquare, List, Users, Play } from 'lucide-angular';
import { MobileAdminMenuComponent } from '../../shared/components/mobile-admin-menu/mobile-admin-menu.component';
import { PlaylistService } from '../../core/services/playlist.service';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from '../../models/playlist.model';

@Component({
  selector: 'app-playlist-details',
  imports: [HeaderComponent, MobileAdminMenuComponent],
  templateUrl: './playlist-details.component.html',
  styleUrl: './playlist-details.component.scss',
})
export class PlaylistDetailsComponent implements OnInit {
  menuItems = [
    { label: 'Home', icon: Home, route: ['/'] },
    { label: 'Episodes', icon: Play, route: ['/episodes'] },
    { label: 'Playlists', icon: List, route: ['/playlists'] },
    { label: 'Confess', icon: MessageSquare, route: ['/confessions'] },
  ];

  currentEpisode = 0;
  playlist!: Playlist;
  loading = signal(true);

  constructor(
    private playlistService: PlaylistService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const playlistId = this.route.snapshot.paramMap.get('id')!;
    this.playlistService.getPlaylist(playlistId).subscribe({
      next: (playlist) => {
        // console.log(playlist);
        this.loading.set(false);
        this.playlist = playlist.data;
      },
      error: (err) => console.log(err),
    });
  }

  handleCurrentEpisode(index: number) {
    this.currentEpisode = index;
  }
}
