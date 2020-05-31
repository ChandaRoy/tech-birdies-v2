import { Component, OnInit } from '@angular/core';

import { Topic } from '../_models/topic';
import { PostQueryService } from '../_services/post-query.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../login/auth-service.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {
  topics = [];
  Topics: any = [];
  currentUser: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postQueryService: PostQueryService,
    private authenticationService: AuthServiceService
  ) { 
    this.currentUser = this.authenticationService.currentUserValue;
    if (!this.currentUser) this.router.navigate(['/']);
   }

  ngOnInit(): void {
    this.getTopics();
  }
  getTopics() {
    this.postQueryService.getTopics(this.currentUser.token).subscribe((res) => {
      console.log(res);
      this.Topics = res;
    })
  }

  gotoDetails(id) {
    this.router.navigate(['topic-detail/'+id], {relativeTo: this.route});
  }

  incLike() {
    this.postQueryService.like().subscribe((res) => {
      console.log(res);
    })
  }

  decLike() {
    this.postQueryService.like().subscribe((res) => {
      console.log(res);
    })
    
  }


}
