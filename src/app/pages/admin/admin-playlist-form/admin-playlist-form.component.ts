import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistService } from '../../../core/services/playlist.service';
import { EpisodeService } from '../../../core/services/episode.service';
import { CommonModule } from '@angular/common';
import { Playlist } from '../../../models/playlist.model';
import { Episode } from '../../../models/episode.model';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-playlist-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './admin-playlist-form.component.html',
  styleUrls: ['./admin-playlist-form.component.scss']
})
export class AdminPlaylistFormComponent implements OnInit {
  playlistForm: FormGroup;
  episodes = signal<Episode[]>([]);
  editing = signal(false);
  playlistId: number | null = null;
  loading = signal(true);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private playlistService: PlaylistService,
    private episodeService: EpisodeService
  ) {
    this.playlistForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      featured: [false],
      episodes: [[]],
      items: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.episodeService.getEpisodes().subscribe({
      next: (res) => this.episodes.set(res.data),
      error: () => console.warn('❌ Failed to load episodes')
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editing.set(true);
      this.playlistId = +id;

      this.playlistService.getPlaylist(id).subscribe({
        next: (res) => {
          const data = res.data;
          this.playlistForm.patchValue({
            title: data.name, // Backend uses `name`
            description: data.description,
            featured: data.featured,
            episodes: data.episodes || []

          });

          if (data.items?.length) {
            data.items.forEach((item: string) => this.items.push(this.fb.control(item)));
          }

          this.loading.set(false);
        },
        error: () => {
          console.warn('❌ Failed to fetch playlist');
          this.loading.set(false);
        }
      });
    } else {
      this.loading.set(false);
    }
  }

  get items(): FormArray {
    return this.playlistForm.get('items') as FormArray;
  }

  get isEdit(): boolean {
    return this.editing();
  }

  addItem(): void {
    this.items.push(this.fb.control(''));
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

 onSubmit(): void {
  const formValue = this.playlistForm.value;

  const payload = {
    name: formValue.title,
    description: formValue.description,
    featured: formValue.featured,
    episodes: formValue.episodes,
    items: formValue.items
  };

  if (this.isEdit) {
    this.playlistService.updatePlaylist(this.playlistId!, payload).subscribe(() => {
      this.router.navigate(['/admin/playlists']);
    });
  } else {
    this.playlistService.createPlaylist(payload).subscribe(() => {
      this.playlistForm.reset({
        title: '',
        description: '',
        featured: false,
        episodes: []
      });
      this.items.clear();

      // Optional Toast
      alert('✅ Playlist created!');
    });
  }
}

}
