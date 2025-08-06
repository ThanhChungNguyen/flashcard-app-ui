import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashcardService } from '../services/flashcard.service';

// Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-set-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatToolbarModule, MatListModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './set-form.component.html',
})
export class SetFormComponent {
  title = '';

  constructor(
    private flashcardService: FlashcardService,
    private router: Router
  ) {}

  createSet() {
    if (!this.title.trim()) return;
    this.flashcardService.addSet(this.title.trim());
    this.router.navigate(['/flashcards']);
  }

}
