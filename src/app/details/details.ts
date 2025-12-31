import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { PersonService } from '../person';
import { Person } from '../person.model';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class DetailsComponent implements OnInit {

  person?: Person;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');

      if (!idParam) {
        this.error = 'Brak identyfikatora osoby w adresie URL.';
        return;
      }

      const id = +idParam;
      console.log('Ładuję szczegóły osoby o id:', id);

      this.personService.getById(id).subscribe({
        next: (p) => {
          if (!p) {
            this.error = 'Nie znaleziono osoby o podanym identyfikatorze.';
            this.person = undefined;
            return;
          }
          console.log('Odebrane szczegóły osoby:', p);
          this.person = p;
          this.error = undefined;
        },
        error: (err) => {
          console.error('Błąd pobierania szczegółów osoby', err);
          this.person = undefined;
          this.error = 'Wystąpił błąd podczas wczytywania danych.';
        }
      });
    });
  }
}
