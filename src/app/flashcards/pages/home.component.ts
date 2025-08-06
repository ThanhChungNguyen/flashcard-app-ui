import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocalStorageFlashcardService } from '../services/localstorageflashcard.service';
import { FlashcardSet } from '../models/flashcard.model';

// Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  sets: FlashcardSet[] = [];

  constructor(private flashcardService: LocalStorageFlashcardService) {}

  ngOnInit(): void {
    this.sets = this.flashcardService.getSets();
  }

  deleteSet(setId: string) {
  const confirmed = confirm('Are you sure you want to delete this set?');
  if (confirmed) {
    this.flashcardService.deleteSet(setId);
    this.sets = this.flashcardService.getSets(); // update local view
  }
}
}
