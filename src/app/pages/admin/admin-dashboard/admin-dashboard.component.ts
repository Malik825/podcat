import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

import {
  ApexChart,
  ApexXAxis,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexTitleSubtitle
} from 'ng-apexcharts';

import { AuthService } from '../../../core/services/auth.service';
import { EpisodeService } from '../../../core/services/episode.service';
import { TeamService } from '../../../core/services/team.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  userName = signal('Admin');
  totalEpisodes = signal(0);
  totalTeam = signal(0);

  // Donut chart data
  donutSeries: number[] = [];
  donutLabels: string[] = [];

  // Line chart data
  lineSeries: ApexAxisChartSeries = [];
  lineChartOptions: ApexChart = {
    type: 'line',
    height: 350
  };
  xAxis: ApexXAxis = { categories: [] };
  dataLabels: ApexDataLabels = { enabled: false };
  chartTitle: ApexTitleSubtitle = { text: 'Episodes Over Time', align: 'left' };

  constructor(
    private authService: AuthService,
    private episodeService: EpisodeService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.userName.set(user?.name || 'Admin');

    this.episodeService.getEpisodes().subscribe({
      next: (res) => {
        const episodes = res.data;
        this.totalEpisodes.set(episodes.length);

        const seasonMap: Record<string, number> = {};
        const dateMap: Record<string, number> = {};

        episodes.forEach((ep) => {
          // Donut chart data: group by season
          seasonMap[ep.season] = (seasonMap[ep.season] || 0) + 1;

          // Line chart data: group by date
          const date = new Date(ep.posted_on).toLocaleDateString();
          dateMap[date] = (dateMap[date] || 0) + 1;
        });

        this.donutLabels = Object.keys(seasonMap).map((s) => `Season ${s}`);
        this.donutSeries = Object.values(seasonMap);

        this.xAxis.categories = Object.keys(dateMap);
        this.lineSeries = [
          {
            name: 'Episodes',
            data: Object.values(dateMap)
          }
        ];
      },
      error: () => console.warn('Failed to fetch episodes')
    });

    this.teamService.getTeamMembers().subscribe({
      next: (res) => this.totalTeam.set(res.data.length),
      error: () => console.warn('Failed to fetch team members')
    });
  }
}
