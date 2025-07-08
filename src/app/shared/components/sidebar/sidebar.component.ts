import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  LayoutDashboard,
  List,
  MessageSquare,
  Users,
  LogOut,
  Headphones
} from 'lucide-angular';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    LucideAngularModule,
    ThemeToggleComponent,
    ConfirmModalComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  readonly LayoutDashboard = LayoutDashboard;
  readonly List = List;
  readonly MessageSquare = MessageSquare;
  readonly Users = Users;
  readonly LogOut = LogOut;
  readonly Headphones = Headphones;

  showLogoutModal = false;

  admin = {
    name: 'Abdul Malik',
    email: 'amalik75@gmail.com',
    avatar: 'https://ui-avatars.com/api/?name=Abdul+Malik&background=random&color=fff'
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  openLogoutModal() {
    this.showLogoutModal = true;
  }

  confirmLogout() {
    this.authService.logout();
    this.toastService.show('You have been logged out.', 'info');
    this.router.navigate(['/login']);
    this.showLogoutModal = false;
  }

  cancelLogout() {
    this.showLogoutModal = false;
  }
}
