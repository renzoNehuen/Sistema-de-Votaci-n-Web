import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ButtonModule } from 'primeng/button';

import { Header } from '../../shared/header/header';

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
    Header
  ],
  templateUrl: './new-voter.html',
  styleUrls: ['./new-voter.scss']
})
export class NewVoter {

  name: string = '';
  lastName: string = '';
  document: string = '';
  dob: Date | null = null;
  isCandidate: boolean = false;

  createVoter() {
    const payload = {
      name: this.name,
      lastName: this.lastName,
      document: this.document,
      dob: this.dob,
      isCandidate: this.isCandidate
    };

    console.log('Enviar al backend:', payload);

    // TODO: conectar con API
  }
}