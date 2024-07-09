import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/auth.reducer';
import { loginAction } from '../../store/auth.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  state$: Observable<AppState>;
  user: string = 'user';

  constructor(
    private authService: AuthService,
    private store: Store<{ auth: AppState }>
  ) {
    this.state$ = this.store.select('auth');
  }
  ngOnInit(): void {
    this.state$.subscribe((state) => {
      this.user = state.email.split('@')[0];
    });
  }
}
