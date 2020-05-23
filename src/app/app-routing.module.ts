import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './_helpers/auth.guard.service';
import { AboutComponent } from './about/about.component';
import { SectionsComponent } from './sections/sections.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ContactComponent } from './contact/contact.component';
import { PostsComponent } from './posts/posts.component';
import { ForumComponent } from './forum/forum.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { TopicListComponent } from './topic-list/topic-list.component';
import { BlogComponent } from './blog/blog.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';



const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'about', component: AboutComponent },
  { path: 'sections', component: SectionsComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'contact', component: ContactComponent },
  { 
    path: 'blogs', 
    component: BlogComponent,
    children: [
      {path: '', component: PostsComponent},
      {path: 'posts', component: PostsComponent},
      {path: 'post-detail/:id', component: PostDetailComponent},
    ] 
  },
  { 
    path: 'forum', 
    component: ForumComponent,
    children: [
    {path: '', component: TopicListComponent},
    {path: 'topic-list', component: TopicListComponent},
    {path: 'topic-detail/:id', component: TopicDetailComponent},
  ] 
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
