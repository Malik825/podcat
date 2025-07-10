import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../../core/services/playlist.service';
import { Playlist } from '../../../models/playlist.model';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { Home, Play, List, MessageSquare, Users } from 'lucide-angular';
import { MobileAdminMenuComponent } from '../../../shared/components/mobile-admin-menu/mobile-admin-menu.component';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MobileAdminMenuComponent],
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent implements OnInit {
  playlists = signal<Playlist[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  menuItems = [
    { label: 'Home', icon: Home, route: ['/'] },
    { label: 'Episodes', icon: Play, route: ['/episodes'] },
    { label: 'Playlists', icon: List, route: ['/playlists'] },
    { label: 'Confess', icon: MessageSquare, route: ['/confessions'] },
    { label: 'Team', icon: Users, route: ['/team'] },
  ];
  colorClasses = ['bg-color-1', 'bg-color-2', 'bg-color-3', 'bg-color-4'];

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.playlistService.getPlaylists().subscribe({
      next: (res) => {
        this.playlists.set(res.data.data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load playlists');
        this.loading.set(false);
      },
    });
  }

  getColorClass(index: number): string {
    return this.colorClasses[index % this.colorClasses.length];
  }
}
