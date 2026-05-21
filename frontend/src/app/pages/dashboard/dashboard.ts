import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Header } from '../../shared/header/header';

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

  constructor(private router: Router) {
    this.loadData();
  }

  loadData() {
    // TODO: Conectar con servicios para obtener datos reales
    this.stats = {
      totalVotes: 150,
      totalCandidates: 5,
      totalVoters: 200
    };
    
    // Datos de ejemplo
    this.votes = [
      { id: 1, candidate: 'Candidato 1', date: '2026-05-07' },
      { id: 2, candidate: 'Candidato 2', date: '2026-05-07' }
    ];
    
    this.candidates = [
      { id: 1, name: 'Candidato 1', votes: 50 },
      { id: 2, name: 'Candidato 2', votes: 45 }
    ];
    
    this.voters = [
      { id: 1, name: 'Votante 1', hasVoted: true, isCandidate: false },
      { id: 2, name: 'Votante 2', hasVoted: false, isCandidate: true }
    ];
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
    this.router.navigate(['/change-password']);
  }

  deleteVoter(voter: any) {
    // UI-only deletion (replace with API call when available)
    this.voters = this.voters.filter(v => v.id !== voter.id);
    this.stats.totalVoters = this.voters.length;
  }

  setCandidate(voter: any, event: any) {
    // Update candidate flag from toggle switch (replace with API call when available)
    const idx = this.voters.findIndex(v => v.id === voter.id);
    if (idx > -1) {
      this.voters[idx].isCandidate = event.checked;
      this.stats.totalCandidates = this.voters.filter(v => v.isCandidate).length;
    }
  }

  logout() {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      window.localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
}