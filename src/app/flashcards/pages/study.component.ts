import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FlashcardSet } from '../models/flashcard.model';
import { FlashcardService } from '../services/flashcard.service';

// Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-study',
  standalone: true,
  imports: [CommonModule, RouterModule,
    MatToolbarModule, MatListModule, MatButtonModule, MatIconModule, MatCardModule,
    MatFormFieldModule, MatInputModule],
  styleUrls: ['./study.component.scss'],
  templateUrl: './study.component.html',
})
export class StudyComponent {
  set: FlashcardSet | undefined;
  currentIndex = 0;
  isFront = true;

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

  toggleCardSide() {
    this.isFront = !this.isFront;
  }

  nextCard() {
    if (this.set && this.currentIndex < this.set.cards.length - 1) {
      this.currentIndex++;
      this.isFront = true;
    }
  }

  prevCard() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.isFront = true;
    }
  }
}
