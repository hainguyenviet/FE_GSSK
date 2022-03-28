import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../model/Person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  //TODO: implement this URL for interacting with data
  //Example: "http://localhost:4200"
  apiURL = "https://run.mocky.io/v3/8fc644f7-de9e-4c36-a3fe-e184f74e4f70"
  baseURL = "http://localhost:8080/"
  constructor(private http: HttpClient) {}

  getAllPerson(){
    return this.http.get<Person>(this.baseURL + 'person')
  }
  

  savePersonalInformation(person: Person) {
    //TODO: update the "this.URL" following the URL for posting data
    return this.http.post<Person>(this.baseURL + 'person', person)
  }
}
