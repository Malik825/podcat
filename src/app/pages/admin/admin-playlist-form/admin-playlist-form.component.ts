import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistService } from '../../../core/services/playlist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-playlist-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-playlist-form.component.html',
  styleUrls: ['./admin-playlist-form.component.scss']
})
export class AdminPlaylistFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private playlistService = inject(PlaylistService);

  playlistForm!: FormGroup;
  isEdit = false;
  loading = signal(true);

  get items(): FormArray {
    return this.playlistForm.get('items') as FormArray;
  }

  ngOnInit(): void {
    this.playlistForm = this.fb.group({
      title: ['', Validators.required],
      episode_id: [null, Validators.required],
      items: this.fb.array([this.fb.control('', Validators.required)])
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.playlistService.getOne(+id).subscribe({
        next: (res) => {
          const { title, episode_id, items } = res.data;
          this.playlistForm.patchValue({ title, episode_id });
          this.items.clear();
          items.forEach(item => this.items.push(this.fb.control(item, Validators.required)));
          this.loading.set(false);
        },
        error: () => {
          alert('Failed to load playlist.');
          this.router.navigate(['/admin/playlists']);
        }
      });
    } else {
      this.loading.set(false);
    }
  }

  addItem(): void {
    this.items.push(this.fb.control('', Validators.required));
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  onSubmit(): void {
    if (this.playlistForm.invalid) return;

    const formValue = this.playlistForm.value;

    if (this.isEdit) {
      const id = +this.route.snapshot.paramMap.get('id')!;
      this.playlistService.update(id, formValue).subscribe(() => {
        this.router.navigate(['/admin/playlists']);
      });
    } else {
      this.playlistService.create(formValue).subscribe(() => {
        this.router.navigate(['/admin/playlists']);
      });
    }
  }
}
