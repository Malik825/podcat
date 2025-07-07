import { Component, OnInit, signal } from '@angular/core';
import { PlaylistService } from '../../../core/services/playlist.service';
import { Playlist } from '../../../models/playlist.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-playlists',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-playlists.component.html',
  styleUrls: ['./admin-playlists.component.scss']
})
export class AdminPlaylistsComponent implements OnInit {
  playlists = signal<Playlist[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.playlistService.getAll().subscribe({
      next: (res) => {
        this.playlists.set(res.data.data); // paginated structure
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to fetch playlists');
        this.loading.set(false);
      }
    });
  }

  deletePlaylist(id: number): void {
    if (confirm('Are you sure you want to delete this playlist?')) {
      this.playlistService.delete(id).subscribe({
        next: () => {
          this.playlists.update(list => list.filter(p => p.id !== id));
        },
        error: () => alert('Delete failed.')
      });
    }
  }
}
