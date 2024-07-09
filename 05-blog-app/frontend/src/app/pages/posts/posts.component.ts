import { Component } from '@angular/core';
import { Post, PostService } from '../../posts/post.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  posts: Post[] = [];
  constructor(private postsService: PostService) {}
  ngOnInit() {
    this.postsService.getPosts().subscribe({
      next: (posts: Post[]) => {
        this.posts = posts;
      },
    });
  }
}
