import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageFlashcardService } from '../services/localstorageflashcard.service';
import { ApiFlashcardService } from '../services/apiflashcard.service';
import { FormsModule } from '@angular/forms';
import { Flashcard, FlashcardSet } from '../models/flashcard.model';
import { v4 as uuidv4 } from 'uuid';

// Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-set-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatToolbarModule, MatListModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './set-detail.component.html',
})
export class SetDetailComponent {
  set: FlashcardSet | undefined;
  newFront = '';
  newBack = '';

  constructor(
    private route: ActivatedRoute,
    private flashcardService: LocalStorageFlashcardService,
    private apiFlashcardService: ApiFlashcardService
  ) {
    const setId = this.route.snapshot.paramMap.get('id');
    if (setId) {
      // this.set = this.flashcardService.getSetById(setId);
      this.apiFlashcardService.getSetById(setId).subscribe((set) => {
        this.set = set;
      });
    }
  }

  addCard() {
    if (!this.set || !this.newFront.trim() || !this.newBack.trim()) return;

    const newCard: Flashcard = {
      id: uuidv4(),
      front: this.newFront.trim(),
      back: this.newBack.trim(),
    };

    this.set.cards.push(newCard);
    // this.flashcardService.updateSet(this.set); 
    this.apiFlashcardService.updateSet(this.set).subscribe(); 

    this.newFront = '';
    this.newBack = '';
  }
  
  deleteCard(cardId: string) {
    if (!this.set) return;

    const confirmed = confirm('Delete this flashcard?');
    if (confirmed) {
      this.set.cards = this.set.cards.filter(c => c.id !== cardId);
      // this.flashcardService.updateSet(this.set);
      this.apiFlashcardService.updateSet(this.set).subscribe(() => {
      });
    }
  }
  
}
