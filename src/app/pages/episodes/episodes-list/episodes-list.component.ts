import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MobileAdminMenuComponent } from '../../../shared/components/mobile-admin-menu/mobile-admin-menu.component';
import {
  Home,
  Play,
  List,
  MessageSquare,
  Users
} from 'lucide-angular';
import { EpisodeService } from '../../../core/services/episode.service';
import { Episode } from '../../../models/episode.model';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MobileAdminMenuComponent],
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.scss']
})
export class EpisodesListComponent implements OnInit {
  menuItems = [
    { label: 'Home', icon: Home, route: ['/'] },
    { label: 'Episodes', icon: Play, route: ['/episodes'] },
    { label: 'Playlists', icon: List, route: ['/playlists'] },
    { label: 'Confess', icon: MessageSquare, route: ['/confessions'] },
    { label: 'Team', icon: Users, route: ['/team'] }
  ];

  episodes: Episode[] = [];
  loading = true;
  error = '';

  constructor(private episodeService: EpisodeService) {}

  ngOnInit(): void {
    this.episodeService.getEpisodes().subscribe({
      next: (res) => {
        this.episodes = res.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load episodes';
        this.loading = false;
      }
    });
  }
}
