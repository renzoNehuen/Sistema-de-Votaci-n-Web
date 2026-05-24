import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

import { Header } from '../../shared/header/header';
import { VoterService, VoterPayload } from '../../services/voter.service';

@Component({
  selector: 'app-new-voter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    DatePicker,
    ToggleSwitch,
    ButtonModule,
    ToastModule,
    Header
  ],
  templateUrl: './new-voter.html',
  styleUrls: ['./new-voter.scss']
})
export class NewVoter implements OnInit {

  name: string = '';
  lastName: string = '';
  document: string = '';
  dob: Date | null = null;
  isCandidate: boolean = false;
  voterId: number | null = null;
  isEditMode: boolean = false;
  pageTitle: string = 'Crear Votante';
  buttonLabel: string = 'Crear';

  constructor(private voterService: VoterService,
              private messageService: MessageService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // If navigation provided the voter object, use it to prefill immediately
    const navState: any = window.history.state || {};
    if (navState && navState.voter) {
      const voter = navState.voter;
      this.voterId = voter.id || null;
      this.isEditMode = true;
      this.pageTitle = 'Editar Votante';
      this.buttonLabel = 'Guardar';
      this.name = voter.name || '';
      this.lastName = voter.lastName || '';
      this.document = voter.document || '';
      this.dob = voter.dob ? new Date(voter.dob) : null;
      this.isCandidate = voter.isCandidate || false;
      return;
    }

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.voterId = parseInt(id, 10);
      this.isEditMode = true;
      this.pageTitle = 'Editar Votante';
      this.buttonLabel = 'Guardar';
      this.loadVoter();
    }
  }

  loadVoter() {
    if (!this.voterId) return;
    this.voterService.getById(this.voterId).subscribe({
      next: (voter: any) => {
        this.name = voter.name;
        this.lastName = voter.lastName || '';
        this.document = voter.document;
        this.dob = voter.dob ? new Date(voter.dob) : null;
        this.isCandidate = voter.isCandidate || false;
      },
      error: (err) => {
        console.error('Error cargando votante', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar el votante' });
        this.router.navigate(['/admin/dashboard']);
      }
    });
  }

  saveVoter() {
    const payload: VoterPayload = {
      name: this.name,
      lastName: this.lastName,
      document: this.document,
      dob: this.dob ? this.dob.toISOString().split('T')[0] : null,
      isCandidate: this.isCandidate
    };

    if (this.isEditMode && this.voterId) {
      this.voterService.update(this.voterId, payload).subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Votante actualizado', detail: 'El votante fue actualizado correctamente' });
          this.router.navigate(['/admin/dashboard']);
        },
        error: (err) => {
          console.error('Error actualizando votante', err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'No se pudo actualizar el votante' });
        }
      });
    } else {
      this.voterService.create(payload).subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Votante creado', detail: 'El votante fue creado correctamente' });
          this.router.navigate(['/admin/dashboard']);
        },
        error: (err) => {
          console.error('Error creando votante', err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'No se pudo crear el votante' });
        }
      });
    }
  }
}