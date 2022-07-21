import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, ReplaySubject, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { text } from '@fortawesome/fontawesome-svg-core';
let options = {
  headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL =  environment.baseURL
  constructor(private http: HttpClient, private router: Router) {
   }
  login(data: any) {
    return this.http.post<any>(`${this.baseURL}/api/login`, data, options)
  }

  loginGoogle() {
    window.open(this.baseURL + '/oauth2/authorization/google', '_self')
  }
  
  singup(data: any) {
    return this.http.post(`${this.baseURL}/api/registration/register`, data, {responseType: 'text'}).pipe(catchError(this.handleError))
  }

  isLoggedIn() {
    if (localStorage.getItem('access_token') != null) {
      return true
    }
    return false
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}` + `headers was: ${error.headers}` + `message was: ${error.message}`) 
        ;
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
