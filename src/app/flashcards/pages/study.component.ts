import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FlashcardSet } from '../models/flashcard.model';
import { FlashcardService } from '../services/flashcard.service';

@Component({
  selector: 'app-study',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./study.component.scss'],
  templateUrl: './study.component.html',
})
export class StudyComponent {
  set: FlashcardSet | undefined;
  currentIndex = 0;
  showBack = false;

  constructor(
    private route: ActivatedRoute,
    private flashcardService: FlashcardService
  ) {
    const setId = this.route.snapshot.paramMap.get('id');
    if (setId) {
      this.set = this.flashcardService.getSetById(setId);
    }
  }

  get currentCard() {
    return this.set?.cards[this.currentIndex];
  }

  flipCard() {
    this.showBack = !this.showBack;
  }

  nextCard() {
    if (this.set && this.currentIndex < this.set.cards.length - 1) {
      this.currentIndex++;
      this.showBack = false;
    }
  }

  prevCard() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.showBack = false;
    }
  }
}
