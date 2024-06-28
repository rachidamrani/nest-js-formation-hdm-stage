import { createReducer, on } from '@ngrx/store';
import { loginAction, logoutAction } from './auth.action';

export interface AppState {
  isLoggedIn: boolean;
  token: string;
  email: string;
}

export const initialState = {
  isLoggedIn: false,
  token: '',
  email: '',
};

export const authReducer = createReducer(
  initialState,
  on(loginAction, (state, action) => {
    return {
      isLoggedIn: true,
      token: action.payload.token,
      email: action.payload.email,
    };
  }),
  on(logoutAction, (state, action) => {
    return {
      isLoggedIn: false,
      token: '',
      email: '',
    };
  })
);
