import { Component, input } from '@angular/core';
import { Episode } from '../../../models/episode.model';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist-card',
  imports: [DatePipe, CommonModule],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss',
})
export class PlaylistCardComponent {
  episode = input<Episode>();
}
