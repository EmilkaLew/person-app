import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonService } from '../person';
import { Person } from '../person.model';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-person.html',
  styleUrl: './add-person.css'
})
export class AddPersonComponent {

  person: Person = {
    address: {}
  };

  error?: string;

  constructor(
    private personService: PersonService,
    private router: Router
  ) {}

  save(): void {
    this.personService.add(this.person).subscribe({
      next: () => {
        this.error = undefined;
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.error('Błąd zapisu osoby', err);
        this.error = 'Nie udało się zapisać danych.';
      }
    });
  }
}
