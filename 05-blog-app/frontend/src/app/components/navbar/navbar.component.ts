import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppState } from '../../store/auth.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logoutAction } from '../../store/auth.action';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  @Input() title: string = '';
  state$: Observable<AppState>;
  userIsLoggedIn: boolean = false;

  constructor(
    private store: Store<{ auth: AppState }>,
    private router: Router
  ) {
    this.state$ = this.store.select('auth');
  }

  ngOnInit(): void {
    this.state$.subscribe((state) => {
      this.userIsLoggedIn = state.isLoggedIn;
    });
  }

  logout() {
    this.store.dispatch(logoutAction());
    this.router.navigateByUrl('auth/signin');
  }
}
