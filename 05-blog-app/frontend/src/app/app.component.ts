import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [NavbarComponent, RouterOutlet, RouterLink],
})
export class AppComponent {
  blogTitle = 'Bloggy';
}
