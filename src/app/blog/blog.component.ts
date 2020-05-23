import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../_models/user';
import { Topic } from '../_models/topic';
import { AuthServiceService } from '../login/auth-service.service';
import { PostQueryService } from '../_services/post-query.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpEventType, HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  currentUser: any;
  users = [];
  topicContent: FormGroup;
  topics = [];
  Posts: any = [];
  showCreate: boolean = false;
  groups: any = [];
  threads: any =[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthServiceService,
    private postQueryService: PostQueryService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    if (!this.currentUser) this.router.navigate(['/']);
  }


  ngOnInit(): void {
    this.getTopicGroups();
    this.getMyTopicThreads();
  }

  toggleShow() {
    this.showCreate = !this.showCreate;
  }

  close() {
    this.showCreate = false;
  }

  getTopicGroups() {
    this.postQueryService.getPostGroups().subscribe((res) => {
      console.log(res);
      this.groups = res;
    });
  }

  getMyTopicThreads() {
    this.postQueryService.getMyPostThreads(this.currentUser.user.email).subscribe((res) => {
      console.log(res);
      this.threads = res;
    });
  }

}
