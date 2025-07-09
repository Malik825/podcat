import { Component, inject, OnInit } from '@angular/core';
//import { MobileAdminMenuComponent } from '../../../shared/components/mobile-admin-menu/mobile-admin-menu.component';
import { Home, MessageSquare, List, Play } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { EpisodeService } from '../../../core/services/episode.service';
import { ActivatedRoute } from '@angular/router';
import { Episode } from '../../../models/episode.model';
import moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-episode-detail',
  imports: [ButtonModule, HeaderComponent],
  templateUrl: './episode-detail.component.html',
  styleUrl: './episode-detail.component.scss',
})
export class EpisodeDetailComponent implements OnInit {
  menuItems = [
    { label: 'Home', icon: Home, route: ['/'] },
    { label: 'Episodes', icon: Play, route: ['/episodes'] },
    { label: 'Playlists', icon: List, route: ['/playlists'] },
    { label: 'Confess', icon: MessageSquare, route: ['/confessions'] },
  ];

  selectedEpisode!: Episode;
  private episodeService = inject(EpisodeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    const episodeId = this.route.snapshot.paramMap.get('id')!;
    // console.log(this.episodeService.getEpisodeDetails(episodeId));
    const episode = this.episodeService.getEpisodeDetails(episodeId)!;
    this.selectedEpisode = {
      ...episode,
      posted_on: moment(episode?.posted_on).format('DD/MM/YY'),
    };
  }

  goToAllEpisodes() {
    this.router.navigate(['/episodes']);
  }
}
