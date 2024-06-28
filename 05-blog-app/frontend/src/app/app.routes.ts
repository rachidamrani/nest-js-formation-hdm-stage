import { Routes } from '@angular/router';
import { SigninFormComponent } from './components/forms/signin-form/signin-form.component';
import { SignupFormComponent } from './components/forms/signup-form/signup-form.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth-guard.guard';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PostComponent } from './pages/post/post.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/signin',
    pathMatch: 'full',
  },
  {
    path: 'auth/signin',
    component: SigninFormComponent,
  },
  {
    path: 'auth/signup',
    component: SignupFormComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'new-post',
    component: AddPostComponent,
    canActivate: [authGuard],
  },
  {
    path: 'posts',
    component: PostsComponent,
    canActivate: [authGuard],
  },
  { path: 'posts/:id', component: PostComponent },
];
