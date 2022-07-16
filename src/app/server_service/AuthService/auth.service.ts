import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, ReplaySubject, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {GoogleAuthProvider} from '@angular/fire/auth'
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
let options = {
  headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL =  environment.baseURL
  //private auth2!: gapi.auth2.GoogleAuth
  //private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1)
  constructor(private http: HttpClient, private fireAth: AngularFireAuth, private router: Router) {
    //   gapi.load('auth2', () => {
    //    this.auth2 = gapi.auth2.init({
    //      client_id: '967628261875-c3ieut14pgpgbu0vjldoqt53ngnib8gs.apps.googleusercontent.com'
    //    })
    //  })
   }
  login(data: any) {
    return this.http.post<any>(`${this.baseURL}/api/login`, data, options)
  }

  singup(data: any) {
    return this.http.post(`${this.baseURL}/api/registration/register`, data, {responseType: 'text'})
  }

  isLoggedIn() {
    if (localStorage.getItem('access_token') != null) {
      return true
    }
    return false
  }

  signInGG() {
    return this.fireAth.signInWithPopup(new GoogleAuthProvider).then(res => {
      this.router.navigateByUrl('/input-information')
      localStorage.setItem('access_token', JSON.stringify(res.user?.uid))
      console.log("token: ", JSON.stringify(res.user?.uid))
      
    }, err => {
      alert(err.message)
    })
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
