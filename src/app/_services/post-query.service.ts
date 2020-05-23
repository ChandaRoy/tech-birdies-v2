import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpClient  } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { QueryMessage } from '../_models/query';
import { Post } from '../_models/post';

@Injectable({
  providedIn: 'root'
})
export class PostQueryService {
  private currentUserSubject: BehaviorSubject<QueryMessage>;
  public currentQuery: Observable<QueryMessage>;
  public url ="http://localhost:8080";
  // baseURL = "http://localhost:8080/api";
  headers = new HttpHeaders().set('Content-Type', 'application/json');


    constructor(private http: HttpClient) {
  
  }

  postQuery(query) {
    return this.http.post<Post>(`${this.url}/query`, query)
    .pipe(map(data => {

        return data;
    }));
  }

  // Forum methods

    addTopic(data): Observable<any> {
      return this.http.post<any>(`${this.url}/content/addTopic`, data, {
        reportProgress: true,
        observe: 'events'
      })
    }

    addComment(data): Observable<any> {
      return this.http.post<any>(`${this.url}/content/topicComment`, data, {
        reportProgress: true,
        observe: 'events'
      })
    }

    getTopics() {
      return this.http.get(this.url+'/content/allTopics');
    }
  
    getTopicById(id) {
      console.log(this.url+'/content/topic/'+id);
      return this.http.get(this.url+'/content/topic/'+id);
    }

    getTopicGroups() {
      return this.http.get(this.url+'/content/topic-groups');
    }

    
  getMyTopicThreads(email) {
    return this.http.get(this.url+'/content/my-topic-threads?email='+email);
  }

  // Forum methods end


  // Blog methods

    addPost(content: string, category: string, postFile: File): Observable<any> {
      var formData: any = new FormData();
      formData.append("content", content);
      formData.append("category", category);
      formData.append("myFile", postFile);
  
      return this.http.post<any>(`${this.url}/content/addPost`, formData, {
        reportProgress: true,
        observe: 'events'
      })
    }

    addPostsComment(data): Observable<any> {
      console.log(data);
      return this.http.post<any>(`${this.url}/content/postComment`, data, {
        reportProgress: true,
        observe: 'events'
      })
    }

    addPostsCommentReply(data): Observable<any> {
      console.log(data);
      return this.http.post<any>(`${this.url}/content/postCommentReply`, data, {
        reportProgress: true,
        observe: 'events'
      })
    }

    getMyPostThreads(email) {
      return this.http.get(this.url+'/content/my-post-threads?email='+email);
    }
  
    getPostGroups() {
      return this.http.get(this.url+'/content/post-groups');
    }

    getPostById(id) {
      console.log(this.url+'/content/post/'+id);
      return this.http.get(this.url+'/content/post/'+id);
    }

    getPosts() {
      return this.http.get(this.url+'/content/all');
    }
    
  // Blog methods end


     // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  like() {
    return this.http.get(this.url+'/content/like');
  }

}
