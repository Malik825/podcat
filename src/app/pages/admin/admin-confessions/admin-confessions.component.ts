import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfessionService } from '../../../core/services/confession.service';
import { Confession } from '../../../models/confession.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-confessions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-confessions.component.html',
  styleUrls: ['./admin-confessions.component.scss']
})
export class AdminConfessionsComponent implements OnInit {
  confessions = signal<Confession[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private confessionService: ConfessionService) {}

  ngOnInit(): void {
    this.fetchConfessions();
  }
searchTerm = signal('');

get filteredConfessions() {
  return computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.confessions().filter(c =>
      c.category.toLowerCase().includes(term) ||
      c.emotion.toLowerCase().includes(term)
    );
  });
}

  fetchConfessions(): void {
    this.loading.set(true);
    this.confessionService.getConfessions().subscribe({
      next: (res) => {
        this.confessions.set(res.data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load confessions');
        this.loading.set(false);
      }
    });
  }

  deleteConfession(id: number): void {
    if (confirm('Are you sure you want to delete this confession?')) {
      this.confessionService.deleteConfession(id).subscribe({
        next: () => this.fetchConfessions(),
        error: () => alert('Failed to delete confession')
      });
    }
  }
  toggleApproval(conf: Confession): void {
  const updated = { is_approved: !conf.is_approved };
  this.confessionService.updateConfession(conf.id, updated).subscribe({
    next: () => this.fetchConfessions(),
    error: () => alert('Failed to update approval')
  });
}

}
