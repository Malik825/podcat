import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { Home, MessageSquare, List, Users, Play } from 'lucide-angular';
import { MobileAdminMenuComponent } from '../../../shared/components/mobile-admin-menu/mobile-admin-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfessionService } from '../../../core/services/confession.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confession',
  imports: [
    HeaderComponent,
    MobileAdminMenuComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './confession.component.html',
  styleUrl: './confession.component.scss',
})
export class ConfessionComponent {
  confessionForm!: FormGroup;
  private confessionService = inject(ConfessionService);
  isCreated = false;
  constructor(private fb: FormBuilder) {
    this.confessionForm = this.fb.group({
      name: [''],
      email: ['', Validators.email],
      message: ['', Validators.required],
    });
  }
  menuItems = [
    { label: 'Home', icon: Home, route: ['/'] },
    { label: 'Episodes', icon: Play, route: ['/episodes'] },
    { label: 'Playlists', icon: List, route: ['/playlists'] },
    { label: 'Confess', icon: MessageSquare, route: ['/confessions'] },
  ];

  onSubmit() {
    this.isCreated = true;
    if (this.confessionForm.valid) {
      if (this.confessionForm.invalid) return;

      const confessionData = {
        message: this.confessionForm.value.message,
        category: 'general',
        emotion: 'neutral',
      };

      this.confessionService.createConfession(confessionData).subscribe({
        next: (value) => {
          this.isCreated = false;
          alert('Confession created successfully...');
          this.confessionForm.reset();
        },
        error: (err) => console.log(err),
      });
    }
  }
}
