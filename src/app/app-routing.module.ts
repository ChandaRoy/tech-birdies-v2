import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './_helpers/auth.guard.service';
import { AboutComponent } from './about/about.component';
import { SectionsComponent } from './sections/sections.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ContactComponent } from './contact/contact.component';



const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'sections', component: SectionsComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'contact', component: ContactComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
