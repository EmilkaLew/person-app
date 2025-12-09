import { Injectable } from '@angular/core';
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

  getAll(): Person[] {
    return this.loadAll();
  }

  getByIndex(index: number): Person | undefined {
    const persons = this.loadAll();
    return persons[index];
  }

  add(person: Person): void {
    const persons = this.loadAll();
    persons.push(person);
    this.saveAll(persons);
  }

  delete(index: number): void {
    const persons = this.loadAll();
    if (index >= 0 && index < persons.length) {
      persons.splice(index, 1);
      this.saveAll(persons);
    }
  }
}
