import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
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
    DialogModule,
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
  
  votes: any[] = [];
  candidates: any[] = [];
  voters: any[] = [];
  selectedVote: any = null;
  showVoteDetails: boolean = false;

  candidateSearch: string = '';
  candidateSort: 'asc' | 'desc' = 'desc';
  displayedCandidates: any[] = [];

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
        this.applyCandidateFilterSort();
      },
      error: (err) => {
        console.error('Error cargando votos', err);
      }
    });

    this.voterService.getAll().subscribe({
      next: (res) => {
        this.voters = res;
        this.calculateDerivedData();
        this.applyCandidateFilterSort();
      },
      error: (err) => {
        console.error('Error cargando votantes', err);
      }
    });
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

  viewVoteDetails(vote: any) {
    this.selectedVote = vote;
    this.showVoteDetails = true;
  }

  closeVoteDetails() {
    this.selectedVote = null;
    this.showVoteDetails = false;
  }

  editVoter(voter: any) {
    if (!voter || !voter.id) return;
    this.router.navigate([`/admin/voters/${voter.id}/edit`], { state: { voter } });
  }

  applyCandidateFilterSort() {
    const term = (this.candidateSearch || '').toLowerCase().trim();
    const list = this.candidates.slice();

    const filtered = list.filter((c: any) => {
      const full = ((c.name || '') + ' ' + (c.lastName || '')).toLowerCase();
      return !term || full.includes(term);
    });

    filtered.sort((a: any, b: any) => {
      const av = a.votes || 0;
      const bv = b.votes || 0;
      return this.candidateSort === 'asc' ? av - bv : bv - av;
    });

    this.displayedCandidates = filtered;
  }

  logout() {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      window.localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
}