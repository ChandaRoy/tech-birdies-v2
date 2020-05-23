import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MyMaterialModule} from './material-module';
import { AngularEditorModule } from '@kolkov/angular-editor';

import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


import { AlertService } from './login/alert.service';
import { AuthServiceService } from './login/auth-service.service';
import { AuthGuardService } from './_helpers/auth.guard.service';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './_components/alert/alert.component';
import { AboutComponent } from './about/about.component';
import { SectionsComponent } from './sections/sections.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ContactComponent } from './contact/contact.component';
import { PostsComponent } from './posts/posts.component';
import { ForumComponent } from './forum/forum.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { TopicListComponent } from './topic-list/topic-list.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { BlogComponent } from './blog/blog.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AlertComponent,
    AboutComponent,
    SectionsComponent,
    ForgotPasswordComponent,
    ContactComponent,
    PostsComponent,
    ForumComponent,
    PostDetailComponent,
    TopicListComponent,
    TopicDetailComponent,
    BlogComponent,
    BlogCreateComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MyMaterialModule,
    FormsModule,
    AngularEditorModule
  ],
  providers: [AlertService, AuthServiceService, AuthGuardService,   { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
