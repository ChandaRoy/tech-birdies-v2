import { Component, OnInit } from '@angular/core';

import { Topic } from '../_models/topic';
import { PostQueryService } from '../_services/post-query.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {
  topics = [];
  Topics: any = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postQueryService: PostQueryService
  ) {  }

  ngOnInit(): void {
    this.getTopics();
  }
  getTopics() {
    this.postQueryService.getTopics().subscribe((res) => {
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
