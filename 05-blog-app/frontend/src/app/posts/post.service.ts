import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/auth.reducer';
import { Observable, merge } from 'rxjs';

export interface Post {
  id: number;
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  userToken: string = '';

  constructor(
    private http: HttpClient,
    private store: Store<{ auth: AppState }>
  ) {
    this.store.select('auth').subscribe((state) => {
      if (state.token) {
        this.userToken = state.token;
      }
    });
  }

  createPost(title: string, content: string) {
    // TODO : send request to server to create a post
    return this.http.post(
      'http://localhost:3000/posts/new-post',
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${this.userToken}`,
        },
      }
    );
  }

  getPost(id: number) {
    // TODO : send request to server to get a single post
    return this.http.get<Post>('http://localhost:3000/posts/' + id, {
      headers: {
        Authorization: `Bearer ${this.userToken}`,
      },
    });
  }

  getPosts() {
    // TODO : send request to server to get all posts
    return this.http.get<Post[]>('http://localhost:3000/posts', {
      headers: {
        Authorization: `Bearer ${this.userToken}`,
      },
    });
  }

  removePost(id: number) {
    return this.http.delete('http://localhost:3000/posts/' + id, {
      headers: {
        Authorization: `Bearer ${this.userToken}`,
      },
    });
  }
}
