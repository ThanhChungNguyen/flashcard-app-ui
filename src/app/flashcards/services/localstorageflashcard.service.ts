import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FlashcardSet } from '../models/flashcard.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageFlashcardService {
  private setsSubject = new BehaviorSubject<FlashcardSet[]>([]);
  sets$ = this.setsSubject.asObservable();

  constructor() {
    const saved = localStorage.getItem('flashcardSets');
    if (saved) {
      this.setsSubject.next(JSON.parse(saved));
    }
  }

  getSets(): FlashcardSet[] {
    return this.setsSubject.value;
  }

  getSetById(id: string): FlashcardSet | undefined {
    return this.getSets().find((s) => s.id === id);
  }

  addSet(title: string) {
    const newSet: FlashcardSet = {
      id: uuidv4(),
      title,
      cards: [],
    };
    const updated = [...this.getSets(), newSet];
    this.setsSubject.next(updated);
    localStorage.setItem('flashcardSets', JSON.stringify(updated));
  }

  updateSet(updatedSet: FlashcardSet) {
    const updated = this.getSets().map((s) =>
      s.id === updatedSet.id ? updatedSet : s
    );
    this.setsSubject.next(updated);
    localStorage.setItem('flashcardSets', JSON.stringify(updated));
  }

  deleteSet(setId: string) {
  const updated = this.getSets().filter(s => s.id !== setId);
  this.setsSubject.next(updated);
  localStorage.setItem('flashcardSets', JSON.stringify(updated));
}
}
