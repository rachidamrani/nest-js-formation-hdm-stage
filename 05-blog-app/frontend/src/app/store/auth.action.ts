import { createAction, props } from '@ngrx/store';
import { LOGIN, LOGOUT } from './auth.constants';

interface Payload {
  token: string;
  email: string;
}

export const loginAction = createAction(LOGIN, props<{ payload: Payload }>());

export const logoutAction = createAction(LOGOUT);
