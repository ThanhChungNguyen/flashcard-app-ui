import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { SetDetailComponent } from './pages/set-detail.component';
import { StudyComponent } from './pages/study.component';
import { SetFormComponent } from './pages/set-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'set/new', component: SetFormComponent },
  { path: 'set/:id', component: SetDetailComponent },
  { path: 'set/:id/study', component: StudyComponent },
];
