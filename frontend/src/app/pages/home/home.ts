import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { Header } from '../../shared/header/header';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    Header
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {

  document: string = '';
  showCandidates: boolean = false;

  candidates = [
    { id: 1, name: 'Juan', lastName: 'Pérez', document: '12345678' },
    { id: 2, name: 'María', lastName: 'González', document: '87654321' },
    { id: 3, name: 'Carlos', lastName: 'Rodríguez', document: '11223344' }
  ];

  searchDocument() {
    if (this.document.trim()) {
      this.showCandidates = true;
    } else {
      this.showCandidates = false;
    }
  }

  vote(id: number) {
    console.log('Voto por candidato:', id);
    // Aquí iría la lógica para registrar el voto
  }
}