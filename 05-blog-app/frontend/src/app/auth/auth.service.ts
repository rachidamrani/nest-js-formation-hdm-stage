import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SIGNIN_API_URL, SIGNUP_API_URL } from './auth.constants';
import { Observable } from 'rxjs';

export interface SignInResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  signUp(
    username: string,
    email: string,
    password: string
  ): Observable<Response> {
    return this.http.post<Response>(SIGNUP_API_URL, {
      username,
      email,
      password,
    });
  }

  singIn(email: string, password: string): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(SIGNIN_API_URL, {
      email,
      password,
    });
  }
}
