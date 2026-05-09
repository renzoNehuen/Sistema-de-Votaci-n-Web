import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { Header } from '../../shared/header/header';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    Header
  ],
  templateUrl: './results.html',
  styleUrls: ['./results.scss']
})
export class Results {

  constructor(private router: Router) {}

  stats = {
    voters: 100,
    candidates: 100,
    votes: 100
  };

  votes = [
    { id: 1, title: 'Voto #1', description: 'Texto descriptivo del voto' },
    { id: 2, title: 'Voto #2', description: 'Texto descriptivo del voto' },
    { id: 3, title: 'Voto #3', description: 'Texto descriptivo del voto' },
    { id: 4, title: 'Voto #4', description: 'Texto descriptivo del voto' },
    { id: 5, title: 'Voto #5', description: 'Texto descriptivo del voto' },
  ];

  goToVote(id: number) {
    this.router.navigate(['/vote', id]); // 👉 ruta detalle
  }
}