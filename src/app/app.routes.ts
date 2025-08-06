import { Routes } from '@angular/router';
import { routes as flashcardRoutes } from './flashcards/flashcards.routes'; 

export const routes: Routes = [
  {
    path: 'flashcards',
    children: flashcardRoutes, // ✅ lazy-load flashcards feature
  },
  { path: '', redirectTo: 'flashcards', pathMatch: 'full' },
];