import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './app-header.html',
  imports: [RouterModule, MatToolbarModule, MatIconModule, MatButtonModule],
})
export class AppHeaderComponent {}
