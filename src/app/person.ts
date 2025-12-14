import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from './person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private apiUrl = 'http://localhost:53962/api/persons';

  constructor(private http: HttpClient) {}

  // GET /api/persons
  getAll(): Observable<Person[]> {
    console.log('GET', this.apiUrl);
    return this.http.get<Person[]>(this.apiUrl);
  }

  // GET /api/persons/{id}
  getById(id: number): Observable<Person> {
    console.log('GET', `${this.apiUrl}/${id}`);
    return this.http.get<Person>(`${this.apiUrl}/${id}`);
  }

  // POST /api/persons
  add(person: Person): Observable<Person> {
    console.log('POST', this.apiUrl, person);
    return this.http.post<Person>(this.apiUrl, person);
  }

  // PUT /api/persons/{id}
  update(id: number, person: Person): Observable<Person> {
    console.log('PUT', `${this.apiUrl}/${id}`, person);
    return this.http.put<Person>(`${this.apiUrl}/${id}`, person);
  }

  // DELETE /api/persons/{id}
  delete(id: number): Observable<void> {
    console.log('DELETE', `${this.apiUrl}/${id}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
