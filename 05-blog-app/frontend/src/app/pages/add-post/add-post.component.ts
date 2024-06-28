import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../../posts/post.service';
import { AppState } from '../../store/auth.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss',
})
export class AddPostComponent {
  addPostForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {
    this.addPostForm = this.fb.group({
      title: ['', [Validators.minLength(6)]],
      content: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.addPostForm.invalid) alert('invalid form');

    const { title, content } = this.addPostForm.value;

    this.postService.createPost(title, content).subscribe({
      next: (response) => {
        this.router.navigateByUrl('posts');
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
