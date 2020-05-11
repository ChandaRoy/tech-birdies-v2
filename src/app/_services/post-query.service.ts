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

    // Create User
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

    getPosts() {
      return this.http.get(this.url+'/content/all');
    }

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

}
