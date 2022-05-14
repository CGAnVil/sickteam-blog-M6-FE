import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './security/login/login.component';
import {RegisterComponent} from './security/register/register.component';
import {ChangePasswordComponent} from './security/change-password/change-password.component';
import {HomeComponent} from './shared/home/home.component';
import {PostManagerComponent} from "./shared/post-manager/post-manager.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: '', component: HomeComponent},
  {path: 'user',component:PostManagerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

