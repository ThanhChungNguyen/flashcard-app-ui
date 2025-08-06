import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocalStorageFlashcardService } from '../services/localstorageflashcard.service';
import { ApiFlashcardService } from '../services/apiflashcard.service';
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

  constructor(private localstorageflashcardService: LocalStorageFlashcardService,
    private apiFlashcardService: ApiFlashcardService
  ) { }

  ngOnInit(): void {
    // this.sets = this.localstorageflashcardService.getSets();
    this.apiFlashcardService.getSets().subscribe((sets) => {
      this.sets = sets;
    });
  }

  deleteSet(setId: string) {
    const confirmed = confirm('Are you sure you want to delete this set?');
    if (confirmed) {
      // this.localstorageflashcardService.deleteSet(setId);
      // this.sets = this.localstorageflashcardService.getSets(); // update local view
      this.apiFlashcardService.deleteSet(setId).subscribe(() => {
        this.sets = this.sets.filter(set => set.id !== setId); // update local view
      });
    }
  }
}
