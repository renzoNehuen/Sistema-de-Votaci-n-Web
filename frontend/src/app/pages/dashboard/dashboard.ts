import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Header } from '../../shared/header/header';
import { VoterService } from '../../services/voter.service';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    TabsModule,
    TableModule,
    ToggleSwitchModule,
    Header
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class AdminDashboard {

  selectedTab: string = "0";
  
  // Datos de ejemplo - estos deberían venir de servicios
  votes: any[] = [];
  candidates: any[] = [];
  voters: any[] = [];

  stats = {
    totalVotes: 0,
    totalCandidates: 0,
    totalVoters: 0
  };

  constructor(private router: Router, private voterService: VoterService, private voteService: VoteService) {
    this.loadData();
  }

  private calculateDerivedData() {
    const hasVotedById = new Set(this.votes.map((vote: any) => vote.voter));
    const voteCountByCandidateId = this.votes.reduce((acc: Record<number, number>, vote: any) => {
      const candidateId = vote.candidate?.id;
      if (candidateId) {
        acc[candidateId] = (acc[candidateId] || 0) + 1;
      }
      return acc;
    }, {});

    this.voters = this.voters.map((voter: any) => ({
      ...voter,
      hasVoted: hasVotedById.has(voter.id)
    }));

    this.candidates = this.voters
      .filter((voter: any) => voter.isCandidate)
      .map((candidate: any) => ({
        ...candidate,
        fullName: `${candidate.name}${candidate.lastName ? ' ' + candidate.lastName : ''}`,
        votes: voteCountByCandidateId[candidate.id] || 0
      }));

    this.stats.totalVoters = this.voters.length;
    this.stats.totalCandidates = this.candidates.length;
  }

  loadData() {
    this.voteService.getAll().subscribe({
      next: (res) => {
        this.votes = res;
        this.stats.totalVotes = this.votes.length;
        this.calculateDerivedData();
      },
      error: (err) => {
        console.error('Error cargando votos', err);
      }
    });

    this.voterService.getAll().subscribe({
      next: (res) => {
        this.voters = res;
        this.calculateDerivedData();
      },
      error: (err) => {
        console.error('Error cargando votantes', err);
      }
    });
  }

  goToResults() {
    this.router.navigate(['/admin/results']);
  }

  goToVotes() {
    this.router.navigate(['/admin/votes']);
  }

  goToCreateVoter() {
    this.router.navigate(['/admin/voters/create']);
  }

  goToChangePassword() {
    this.router.navigate(['/admin/change-password']);
  }

  deleteVoter(voter: any) {
    if (!voter || !voter.id) return;
    this.voterService.delete(voter.id).subscribe({
      next: () => {
        this.voters = this.voters.filter((v: any) => v.id !== voter.id);
        this.calculateDerivedData();
      },
      error: (err) => {
        console.error('Error eliminando votante', err);
      }
    });
  }

  editVoter(voter: any) {
    if (!voter || !voter.id) return;
    // Pass voter via navigation state to populate form immediately
    this.router.navigate([`/admin/voters/${voter.id}/edit`], { state: { voter } });
  }

  logout() {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      window.localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
}