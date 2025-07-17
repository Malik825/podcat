import { Component, inject, OnInit, signal } from '@angular/core';
import { Home, MessageSquare, List, Users, Play } from 'lucide-angular';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MobileAdminMenuComponent } from '../../../shared/components/mobile-admin-menu/mobile-admin-menu.component';
import { EpisodeService } from '../../../core/services/episode.service';
import { EpisodeCardComponent } from '../../../shared/components/episode-card/episode-card.component';
import { Episode } from '../../../models/episode.model';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MeetTheTeamComponent } from '../../../shared/components/meet-the-team/meet-the-team.component';
import { TeamService } from '../../../core/services/team.service';
import { TeamMember } from '../../../models/team-member.model';
import { PlaylistService } from '../../../core/services/playlist.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeaderComponent,
    MobileAdminMenuComponent,
    EpisodeCardComponent,
    ProgressSpinnerModule,
    MeetTheTeamComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  episodes!: Episode[];
  loading = true;
  public episodeService = inject(EpisodeService);
  private teamService = inject(TeamService);
  private playlistService = inject(PlaylistService);
  teamMembers = signal<TeamMember[]>([]);

  menuItems = [
    { label: 'Home', icon: Home, route: ['/'] },
    { label: 'Episodes', icon: Play, route: ['/episodes'] },
    { label: 'Playlists', icon: List, route: ['/playlists'] },
    { label: 'Confess', icon: MessageSquare, route: ['/confessions'] },
  ];

  ngOnInit(): void {
    this.episodeService.getEpisodes().subscribe({
      next: (value) => {
        this.loading = false;
        const filteredEpisodes = value.data.slice(0, 3);
        this.episodes = filteredEpisodes;
      },
    });
    this.teamService.getTeamMembers().subscribe({
      next: (res) => {
        console.log(res.data)
       return  this.teamMembers.set(res.data)

      },
      error: () => console.warn('❌ Failed to load team members'),
    });
  }
}
