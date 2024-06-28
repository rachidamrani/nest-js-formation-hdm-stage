import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginAction } from '../../../store/auth.action';
import { AppState } from '../../../store/auth.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signin-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.scss',
})
export class SigninFormComponent {
  signInForm: FormGroup;
  formIsSubmitted = false;
  state$: Observable<AppState>;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private router: Router,
    private store: Store<{ auth: AppState }>
  ) {
    this.state$ = this.store.select('auth');

    this.signInForm = this.fb.group({
      email: ['', [Validators.email, Validators.minLength(6)]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.state$.subscribe(({ isLoggedIn }) => {
      if (isLoggedIn) {
        this.router.navigateByUrl('home');
      }
    });
  }

  onSubmit() {
    // TODO : send the form data to the server to sign up user
    this.formIsSubmitted = true;
    if (this.signInForm.invalid) return alert('Invalid form');

    const { email, password } = this.signInForm.value;

    this.authService.singIn(email, password).subscribe({
      next: (response) => {
        this.store.dispatch(
          loginAction({
            payload: {
              token: response.access_token,
              email: email,
            },
          })
        );

        this.router.navigateByUrl('home');
      },
      error: (err) => {
        alert('Oops ! something went wrong ! ');
      },
    });
  }
}
