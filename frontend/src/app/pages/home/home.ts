import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Header } from '../../shared/header/header';
import { VoterService } from '../../services/voter.service';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ToastModule,
    Header
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  providers: [MessageService]
})
export class Home {

  document: string = '';
  showCandidates: boolean = false;
  currentVoter: any = null;
  candidates: any[] = [];

  constructor(
    private voterService: VoterService,
    private voteService: VoteService,
    private messageService: MessageService
  ) {}

  searchDocument() {
    const trimmed = this.document.trim();
    if (!trimmed) {
      this.showCandidates = false;
      this.currentVoter = null;
      this.candidates = [];
      return;
    }

    this.voterService.findByDocument(trimmed).subscribe({
      next: (voter: any) => {
        this.currentVoter = voter;
        this.loadCandidates();
      },
      error: (err) => {
        this.currentVoter = null;
        this.candidates = [];
        this.showCandidates = false;
        this.messageService.add({
          severity: 'warn',
          summary: 'Documento no encontrado',
          detail: 'No existe un votante con esa cédula'
        });
      }
    });
  }

  loadCandidates() {
    this.voterService.getPublicCandidates().subscribe({
      next: (candidates: any[]) => {
        this.candidates = candidates;
        this.showCandidates = this.candidates.length > 0;
      },
      error: (err) => {
        console.error('Error cargando candidatos', err);
        this.candidates = [];
        this.showCandidates = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los candidatos'
        });
      }
    });
  }

  vote(candidateId: number) {
    if (!this.currentVoter) {
      this.messageService.add({
        severity: 'error',
        summary: 'Documento requerido',
        detail: 'Ingrese su cédula antes de votar'
      });
      return;
    }

    if (this.currentVoter.id === candidateId) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Votación inválida',
        detail: 'No puede votar por usted mismo'
      });
      return;
    }

    const payload = {
      voter: this.currentVoter.id,
      voterVoted: candidateId
    };

    this.voteService.createPublic(payload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Voto registrado',
          detail: 'Su voto fue enviado correctamente'
        });
        this.showCandidates = false;
        this.candidates = [];
      },
      error: (err) => {
        console.error('Error registrando voto', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error al votar',
          detail: err?.error?.message || 'No se pudo registrar el voto'
        });
      }
    });
  }
}