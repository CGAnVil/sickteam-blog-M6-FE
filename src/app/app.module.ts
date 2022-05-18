import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './security/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './service/auth/auth.interceptor';
import { RegisterComponent } from './security/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  _MatMenuDirectivesModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatMenuModule, MatToolbarModule
} from '@angular/material';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ChangePasswordComponent } from './unser-info-manage/change-password/change-password.component';
import { HomeComponent } from './shared/home/home.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { PostManagerComponent } from './post-manage-by-user/post-manager/post-manager.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PostCreateComponent } from './post-manage-by-user/post-create/post-create.component';
import { PostDetailComponent } from './post-manage-by-user/post-detail/post-detail.component';
import { PostEditComponent } from './post-manage-by-user/post-edit/post-edit.component';
import { InfoEditComponent } from './unser-info-manage/info-edit/info-edit.component';
import { InfoDetailComponent } from './unser-info-manage/info-detail/info-detail.component';
import { PostFullDetailComponent } from './post-full-detail/post-full-detail.component';

import { PostDetailCategoryComponent } from './post-detail-category/post-detail-category.component';

import { CreateCommentComponent } from './comment/create-comment/create-comment.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    ChangePasswordComponent,
    HomeComponent,
    PostManagerComponent,
    PostCreateComponent,
    PostDetailComponent,
    PostEditComponent,
    InfoEditComponent,
    InfoDetailComponent,
    PostFullDetailComponent,

    PostDetailCategoryComponent,

    CreateCommentComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatDialogModule,

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
