import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Person } from './person.model';

const STORAGE_KEY = 'persons';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private loadAll(): Person[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return [];
    }
    try {
      return JSON.parse(data) as Person[];
    } catch (e) {
      console.error('Error parsing persons from localStorage', e);
      return [];
    }
  }

  private saveAll(persons: Person[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persons));
  }

  private generateId(persons: Person[]): number {
    // zakładamy, że Person może mieć pole id (opcjonalne)
    const ids = persons
      .map(p => (p as any).id as number | undefined)
      .filter((id): id is number => id != null);

    if (ids.length === 0) {
      return 1;
    }
    return Math.max(...ids) + 1;
  }

  // --- API używane przez komponenty ---

  // zamiast HTTP: zwracamy Observable z lokalnych danych
  getAll(): Observable<Person[]> {
    const persons = this.loadAll();
    return of(persons);
  }

  getById(id: number): Observable<Person | undefined> {
    const persons = this.loadAll();
    const person = persons.find(p => (p as any).id === id);
    return of(person);
  }

  add(person: Person): Observable<Person> {
    const persons = this.loadAll();

    // kopiujemy obiekt i nadajemy id, jeśli go nie ma
    const newPerson: any = { ...person };
    if (newPerson.id == null) {
      newPerson.id = this.generateId(persons);
    }

    persons.push(newPerson as Person);
    this.saveAll(persons);

    return of(newPerson as Person);
  }

  delete(id: number): Observable<void> {
    let persons = this.loadAll();
    persons = persons.filter(p => (p as any).id !== id);
    this.saveAll(persons);
    return of(void 0);
  }
}
