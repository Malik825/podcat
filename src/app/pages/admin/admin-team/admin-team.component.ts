// src/app/pages/admin/admin-team/admin-team.component.ts
import { Component } from '@angular/core';
import { TeamMember } from '../../../models/team-member.model';
import { TeamService } from '../../../core/services/team.service';
import { CommonModule } from '@angular/common';
import { AdminTeamFormComponent } from '../admin-team-form/admin-team-form.component';
import { LucideAngularModule, SquarePen, Trash2, Linkedin, Twitter, Instagram } from 'lucide-angular';

import { ToastService } from '../../../core/services/toast.service';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-team',
  standalone: true,
  imports: [CommonModule, AdminTeamFormComponent, LucideAngularModule, ConfirmModalComponent, FilterPipe, FormsModule ],
  templateUrl: './admin-team.component.html',
  styleUrl: './admin-team.component.scss'
})
export class AdminTeamComponent {
  teamMembers: TeamMember[] = [];
  showForm = false;
  showConfirmModal = false;
  searchTerm = '';
  editingMember?: TeamMember;
  memberToDelete: TeamMember | null = null;
  readonly SquarePen = SquarePen;
  readonly Trash2 = Trash2;
  readonly Linkedin = Linkedin;
  readonly Twitter = Twitter;
  readonly Instagram = Instagram;

  constructor(private teamService: TeamService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.loadTeam();
  }

 loadTeam(): void {
  this.teamService.getTeamMembers().subscribe({
    next: (response) => {
      this.teamMembers = response.data.map((member, index) => ({
        ...member,
        profile_image: member.profile_image?.trim()
          ? member.profile_image
          : `https://picsum.photos/seed/member${index}/200/200`
      }));
    },
    error: (err) => {
      console.error('Failed to fetch team members:', err);
    }
  });
}


  toggleForm(): void {
    this.showForm = !this.showForm;
    this.editingMember = undefined;
  }

  onFormSubmitted(): void {
    this.toggleForm();
    this.loadTeam(); 
  }

  editMember(member: TeamMember): void {
    this.editingMember = member;
    this.showForm = true;
  }

  confirmDelete(member: TeamMember): void {
    this.memberToDelete = member;
    this.showConfirmModal = true;
  }
  
  deleteMember(): void {
    if (!this.memberToDelete) return;
  
    this.teamService.deleteTeamMember(this.memberToDelete.id).subscribe({
      next: () => {
        this.toastService.show('Team member deleted.', 'success');
        this.teamMembers = this.teamMembers.filter(m => m.id !== this.memberToDelete?.id);
        this.showConfirmModal = false;
        this.memberToDelete = null;
      },
      error: () => {
        this.toastService.show('Failed to delete member.', 'error');
        this.showConfirmModal = false;
      }
    });
  }

  getSocialUrl(member: TeamMember, platform: string): string | undefined {
    return member.social_media_links.find(link => link.platform === platform)?.url;
  }

  hideConfirmModal() {
    this.showConfirmModal = false;
  }
  
}
