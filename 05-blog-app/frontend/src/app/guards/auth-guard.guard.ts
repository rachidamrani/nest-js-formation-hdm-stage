import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/auth.reducer';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<{ auth: AppState }>);
  const router = inject(Router);
  let isLoggedIn = false;

  store.select('auth').subscribe((state) => {
    if (!state.isLoggedIn) {
      router.navigateByUrl('auth/signin');
    } else {
      isLoggedIn = state.isLoggedIn;
    }
  });

  return isLoggedIn;
};
