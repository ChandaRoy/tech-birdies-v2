import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpClient  } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url ="http://localhost:8080";
  

  constructor(private http: HttpClient) { }

  updateProfile(data): Observable<any> {
    console.log(data);
    var formData: any = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("company",data.company );
    formData.append("aboutMe", data.aboutMe );
    formData.append("myFile", data.myFile);
    formData.append("password", data.password);
    return this.http.post<any>(`${this.url}/user/updateUser`, formData)    
    .pipe(map(data => {
      return data;
  }));
  }

  getUserDetails(id) {
    return this.http.get(this.url+'/user/details/'+id);
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