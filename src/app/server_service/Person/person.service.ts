import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../../server_service/model/Person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {

  //baseURL = 'http://localhost:8080';//environment.baseURL
  baseURL = 'http://giasusuckhoe.vn/gssk-1.0.0';
  constructor(private http: HttpClient) {}

  getAllPerson(username: string) {
    return this.http.get<Person>(`${this.baseURL}/api/person/`+ username);
  }

  updatePerson(data: any, username: string) {
    return this.http.put<any>(`${this.baseURL}/api/person/update/`+ username, data);
  }

  convertGenogram(username: string) {
    return this.http.post(`${this.baseURL}/api/genogram/convert/` + username, null)
  }

  getGenogram(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/api/genogram/` + id);
  }

  getRiskUTV(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/api/genogram/riskUTV/` + username);
  }
  
  getRiskUTDTT(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/api/genogram/riskUTDTT/` + username);
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
