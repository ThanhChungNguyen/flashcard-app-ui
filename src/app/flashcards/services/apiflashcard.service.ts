import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlashcardSet } from '../models/flashcard.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiFlashcardService {
  private baseUrl = `${environment.apiUrl}/flashcards`;

  constructor(private http: HttpClient) {}

  getSets(): Observable<FlashcardSet[]> {
    return this.http.get<FlashcardSet[]>(this.baseUrl);
  }

  getSetById(id: string): Observable<FlashcardSet> {
    return this.http.get<FlashcardSet>(`${this.baseUrl}/${id}`);
  }

  addSet(title: string): Observable<FlashcardSet> {
    return this.http.post<FlashcardSet>(this.baseUrl, { title });
  }

  updateSet(updatedSet: FlashcardSet): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${updatedSet.id}`, updatedSet);
  }

  deleteSet(setId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${setId}`);
  }
}
