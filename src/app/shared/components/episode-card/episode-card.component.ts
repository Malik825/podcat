import { Component, Input } from '@angular/core';
import { Episode } from '../../../models/episode.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-episode-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './episode-card.component.html',
  styleUrl: './episode-card.component.scss',
})
export class EpisodeCardComponent {
  @Input() episode!: Episode;
}
