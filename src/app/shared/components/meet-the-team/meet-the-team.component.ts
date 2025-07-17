import { Component, input } from '@angular/core';
import { TeamMember } from '../../../models/team-member.model';

@Component({
  selector: 'app-meet-the-team',
  imports: [],
  templateUrl: './meet-the-team.component.html',
  styleUrl: './meet-the-team.component.scss'
})
export class MeetTheTeamComponent {
 teamMember = input<TeamMember>()
}
