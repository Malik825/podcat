import { Component, inject } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Home, MessageSquare, List, Users, Play } from 'lucide-angular';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MobileAdminMenuComponent } from '../../../shared/components/mobile-admin-menu/mobile-admin-menu.component';
import { EpisodeService } from '../../../core/services/episode.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, MobileAdminMenuComponent, PaginatorModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  public episodeService = inject(EpisodeService);
  menuItems = [
    { label: 'Home', icon: Home, route: ['/'] },
    { label: 'Episodes', icon: Play, route: ['/episodes'] },
    { label: 'Playlists', icon: List, route: ['/playlists'] },
    { label: 'Confess', icon: MessageSquare, route: ['/confessions'] },
  ];
  first: number = 0;

  rows: number = 10;

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }
}
