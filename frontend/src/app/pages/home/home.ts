import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ToastModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {

  document: string = '';
  showCandidates: boolean = false;

  candidates = [];

  searchDocument() {
    this.showCandidates = true;
  }

  vote(id: number) {
    console.log(id);
  }
}