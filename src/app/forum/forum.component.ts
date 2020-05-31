import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../_models/user';
import { Topic } from '../_models/topic';
import { AuthServiceService } from '../login/auth-service.service';
import { PostQueryService } from '../_services/post-query.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpEventType, HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  currentUser: any;
  users = [];
  topicContent: FormGroup;
  topics = [];
  Topics: any = [];
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
    this.getTopics();
    this.getTopicGroups();
    this.getMyTopicThreads();
    this.topicContent = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      subcategory: ['', Validators.required]
    });
  }
  
  toggleShow() {
    this.showCreate = !this.showCreate;
  }

  close() {
    this.showCreate = false;
  }
  onSubmit() {

    this.postQueryService.addTopic(
      this.topicContent.value,
      this.currentUser.token
    ).subscribe((data) => {
      this.Topics.push(data);
    });
  }

  getTopics() {
    this.postQueryService.getTopics(this.currentUser.token).subscribe((res) => {
      console.log(res);
      this.Topics = res;
    });
  }

  getTopicGroups() {
    this.postQueryService.getTopicGroups(this.currentUser.token).subscribe((res) => {
      console.log(res);
      this.groups = res;
    });
  }

  getMyTopicThreads() {
    this.postQueryService.getMyTopicThreads(this.currentUser.token).subscribe((res) => {
      console.log(res);
      this.threads = res;
    });
  }

}
