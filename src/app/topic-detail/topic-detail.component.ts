import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PostQueryService } from '../_services/post-query.service';
import { User } from '../_models/user';
import { AuthServiceService } from '../login/auth-service.service';


@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {
  comment: string;
  topicId: string;
  topic: any = {};
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
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.topicId = params.id;
      this.getTopic();
    });
    
  }

  getTopic() {
    this.postQueryService.getTopicById(this.topicId).subscribe((res) => {
      console.log(res);
      this.topic = res;
    })
  }
  onComment() {
    let postData = {
      "id": this.topicId,
      "commentText" : this.comment,
      "commentedByName" : this.currentUser.user.firstName+' '+this.currentUser.user.lastName,
      "commentedByEmail": this.currentUser.user.email,
      "commentedOn": new Date()
    };
    this.postQueryService.addComment(
      postData
    ).subscribe((data) => {
      this.getTopic();
      // this.Topics.push(data);
    })
  }

  goBack() {
    this.router.navigate(['../../../forum/'], {relativeTo: this.route});
  }
}
