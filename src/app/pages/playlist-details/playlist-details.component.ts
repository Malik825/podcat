import { Component, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Home, MessageSquare, List, Users, Play } from 'lucide-angular';
import { MobileAdminMenuComponent } from '../../shared/components/mobile-admin-menu/mobile-admin-menu.component';
import { PlaylistService } from '../../core/services/playlist.service';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from '../../models/playlist.model';
import { AudioService } from '../../core/services/audio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist-details',
  imports: [HeaderComponent, MobileAdminMenuComponent, CommonModule],
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
  isPlaying = false;
  currentProgress = 0;
  currentTime = 0;
  duration = 0;

  constructor(
    private playlistService: PlaylistService,
    private route: ActivatedRoute,
    private audioService: AudioService
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

    this.audioService.getProgressObservable().subscribe((progress) => {
      this.currentProgress = progress;
    });

    this.audioService.getCurrentTimeObservable().subscribe((time) => {
      this.currentTime = time;
    });

    this.audioService.getDurationObservable().subscribe((duration) => {
      this.duration = duration;
    });
  }

  formatTime(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const hrsStr = hrs > 0 ? `${hrs}:` : '';
    const minsStr = hrs > 0 ? (mins < 10 ? `0${mins}` : `${mins}`) : `${mins}`;
    const secsStr = secs < 10 ? `0${secs}` : `${secs}`;
    return `${hrsStr}${minsStr}:${secsStr}`;
  }

  handleCurrentEpisode(index: number) {
    this.currentEpisode = index;
  }

  playCurrentEpisode() {
    if (
      !this.playlist ||
      !this.playlist.episodes ||
      this.playlist.episodes.length === 0
    ) {
      return;
    }
    const episode = this.playlist.episodes[this.currentEpisode];
    if (!this.isPlaying) {
      if (episode && episode.audio_url) {
        this.audioService.play(episode.audio_url);
        this.isPlaying = true;
      }
    } else {
      this.audioService.pause();
      this.isPlaying = false;
    }
  }
}
