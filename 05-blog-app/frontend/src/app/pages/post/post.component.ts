import { Component } from '@angular/core';
import { Post, PostService } from '../../posts/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  post: Post | null = null;
  id: string | null = '';

  constructor(
    private postsSerivce: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });

    if (this.id) {
      this.postsSerivce.getPost(+this.id).subscribe({
        next: (post) => {
          this.post = post;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  deletePost() {
    if (this.id) {
      this.postsSerivce.removePost(+this.id).subscribe({
        next: (response) => {
          this.router.navigateByUrl('posts');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
