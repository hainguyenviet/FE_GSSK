import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

let options = {
  headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = 'http://localhost:8080'
  constructor(private http: HttpClient) { }
  login(data: any) {
    return this.http.post(`${this.baseURL}/api/login`, data, options);
  }

  singup(data: any) {
    return this.http.post<any>(`${this.baseURL}/api/registration/register`, data);
  }
}
