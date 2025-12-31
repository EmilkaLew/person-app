import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { PersonService } from '../person';
import { Person } from '../person.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    NgIf,
    AsyncPipe,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class ListComponent implements OnInit {

  persons$!: Observable<Person[]>;
  error?: string;

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.persons$ = this.personService.getAll();
  }

  delete(id?: number): void {
    if (id == null) return;

    this.personService.delete(id).subscribe({
      next: () => this.load(),
      error: (err) => {
        console.error('Błąd usuwania osoby', err);
        this.error = 'Nie udało się usunąć osoby.';
      }
    });
  }
}
