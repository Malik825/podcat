import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TeamService } from '../../../core/services/team.service';
import { ToastService } from '../../../core/services/toast.service';
import { TeamMember } from '../../../models/team-member.model';
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: 'app-admin-team-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './admin-team-form.component.html',
  styleUrl: './admin-team-form.component.scss'
})
export class AdminTeamFormComponent implements OnInit, OnChanges {
  @Input() member: TeamMember | null = null;
  @Output() submitted = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  teamForm!: FormGroup;
X: string = '';
  showForm = false;

  editingMember?: TeamMember;

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['member'] && changes['member'].currentValue) {
      this.initForm();
    }
  }

  initForm(): void {
    this.teamForm = this.fb.group({
      name: [this.member?.name || '', Validators.required],
      role: [this.member?.role || '', Validators.required],
      bio: [this.member?.bio || ''],
      profile_image: [this.member?.profile_image || ''],
      social_media_links: this.fb.group({
        linkedin: [this.getSocialLink('LinkedIn'), [Validators.required, Validators.pattern('https?://.+')]],
        twitter: [this.getSocialLink('Twitter'), [Validators.required, Validators.pattern('https?://.+')]],
        instagram: [this.getSocialLink('Instagram'), [Validators.required, Validators.pattern('https?://.+')]]
      })
    });
  }

  getSocialLink(platform: string): string {
    return (
      this.member?.social_media_links.find(link => link.platform === platform)?.url || ''
    );
  }
 toggleForm(): void {
    this.showForm = !this.showForm;
    this.editingMember = undefined;
  }
  onSubmit(): void {
    if (this.teamForm.invalid) return;

    const formValue = this.teamForm.value;
    const linksGroup = formValue.social_media_links;

    const payload = {
      ...formValue,
      social_media_links: [
        { platform: 'LinkedIn', url: linksGroup.linkedin },
        { platform: 'Twitter', url: linksGroup.twitter },
        { platform: 'Instagram', url: linksGroup.instagram }
      ]
    };

    if (this.member?.id) {
      this.teamService.updateTeamMember(this.member.id, payload).subscribe({
        next: () => {
          this.toastService.show('Team member updated successfully!', 'success');
          this.submitted.emit();
        },
        error: () => {
          this.toastService.show('Failed to update member.', 'error');
        }
      });
    } else {
      this.teamService.addTeamMember(payload).subscribe({
        next: () => {
          this.toastService.show('Team member added successfully!', 'success');
          this.submitted.emit();
          this.initForm();
        },
        error: () => {
          this.toastService.show('Failed to add team member.', 'error');
        }
      });
    }
  }



}