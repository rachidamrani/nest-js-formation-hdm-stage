import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './signup-form.component.html',
})
export class SignupFormComponent {
  signUpForm: FormGroup;
  formIsSubmitted = false;
  signInIsSuccessful = false;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private router: Router
  ) {
    // Signup form with validations
    this.signUpForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.email, Validators.minLength(6)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  inputIsValid(name: string) {
    return (
      this.signUpForm.get(name)?.valid &&
      (this.signUpForm.get(name)?.touched ||
        this.signUpForm.get(name)?.dirty ||
        this.formIsSubmitted)
    );
  }

  inputIsInvalid(name: string) {
    return (
      this.signUpForm.get(name)?.invalid &&
      (this.signUpForm.get(name)?.touched ||
        this.signUpForm.get(name)?.dirty ||
        this.formIsSubmitted)
    );
  }

  onSubmit() {
    this.formIsSubmitted = true;

    if (this.signUpForm.invalid) return alert('Invalid form');

    const { username, email, password } = this.signUpForm.value;

    this.authService.signUp(username, email, password).subscribe({
      next: () => {
        this.signInIsSuccessful = true;
        setTimeout(() => {
          this.router.navigateByUrl('home');
        }, 1000);
      },
      error: (err) => {
        alert('Oops, sorry! something went wrong!');
      },
    });
  }
}
