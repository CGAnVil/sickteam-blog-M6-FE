import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './security/login/login.component';
import {RegisterComponent} from './security/register/register.component';
import {ChangePasswordComponent} from './security/change-password/change-password.component';
import {HomeComponent} from './shared/home/home.component';
import {PostManagerComponent} from './post-manage-by-user/post-manager/post-manager.component';
import {PostCreateComponent} from './post-manage-by-user/post-create/post-create.component';
import {CommentListComponent} from './comment/comment-list/comment-list.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'user', component: PostManagerComponent},
  {path: '', component: HomeComponent},
  {path: 'createPost', component: PostCreateComponent},
  {path: `comments`, component: CommentListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

