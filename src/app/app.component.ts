import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthServiceService } from './login/auth-service.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tech-bidies-app-v2';
  currentUser: any;

  constructor(
      private router: Router,
      private authenticationService: AuthServiceService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      // if(!this.currentUser) this.router.navigate(['/login']);
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
