import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes as flashcardRoutes } from './flashcards/flashcards.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      {
        path: 'flashcards',
        children: flashcardRoutes,
      },
    ]),
  ],
};
