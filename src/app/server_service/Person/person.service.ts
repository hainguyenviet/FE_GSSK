import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../../server_service/model/Person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
 
  baseURL = environment.baseURL
 // baseURL = 'http://giasusuckhoe.vn/gssk-1.0.0';
  constructor(private http: HttpClient) {}

  getHeaders() {
    const token = localStorage.getItem('access_token')
    return token? new HttpHeaders().set('Authorization', 'Bearer ' + token) : null; 
  }
  getAllPerson() {
    return this.http.get<Person>(`${this.baseURL}/person`);
  }

  postPerson(data: any) {
    let headers = this.getHeaders();
    if (headers instanceof HttpHeaders)
    {
      return this.http.post<any>(`${this.baseURL}/api/person/create`, data, {headers: headers});
    }
    return this.http.post<any>(`${this.baseURL}/api/person/create`, data);
  }

  convertGenogram(id: string) {
    let headers = this.getHeaders();
    if (headers instanceof HttpHeaders)
    {
      return this.http.post(`${this.baseURL}/api/genogram/convert/` + id, null, {headers: headers})
    }
    return this.http.post(`${this.baseURL}/api/genogram/convert/` + id, null)
  }

  getGenogram(id: string): Observable<any[]> {
    let headers = this.getHeaders();
    if (headers instanceof HttpHeaders)
    {
      return this.http.get<any[]>(`${this.baseURL}/api/genogram/` + id, {headers: headers});
    }
    return this.http.get<any[]>(`${this.baseURL}/api/genogram/` + id);
  }
}
