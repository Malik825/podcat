import { Component, OnInit, signal } from '@angular/core';
import { PlaylistService } from '../../../core/services/playlist.service';
import { Playlist } from '../../../models/playlist.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  LayoutDashboard,
  List,
  MessageSquare,
  Users,
  LogOut,
  Headphones
} from 'lucide-angular';
@Component({
  selector: 'app-admin-playlists',
  standalone: true,
  templateUrl: './admin-playlists.component.html',
  styleUrl: './admin-playlists.component.scss',
  imports: [CommonModule, RouterModule, LucideAngularModule]
})
export class AdminPlaylistsComponent implements OnInit {
  playlists = signal<Playlist[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.fetchPlaylists();
  }

  fetchPlaylists(): void {
    this.loading.set(true);
    this.playlistService.getPlaylists().subscribe({
      next: (res) => {
        this.playlists.set(res.data.data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load playlists');
        this.loading.set(false);
      }
    });
  }

deletePlaylist(id: number): void {
  const confirmDelete = confirm('Are you sure you want to delete this playlist?');
  if (!confirmDelete) return;

  this.playlistService.deletePlaylist(id).subscribe({
    next: () => {
      console.log('✅ Playlist deleted');
      this.fetchPlaylists();
    },
    error: (err) => {
      console.error('❌ Failed to delete playlist:', err);
      alert('Failed to delete playlist');
    }
  });
}
getPlaylistImage(id: number): string {
  return `https://picsum.photos/seed/playlist-${id}/400/240`;
}
estimateDuration(count: number): string {
  const avg = 10; // avg 10 mins per episode
  const total = count * avg;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${h}h ${m}m`;
}

getRandomDuration(): string {
  const min = Math.floor(Math.random() * 4) + 2;
  const sec = Math.floor(Math.random() * 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}


}
