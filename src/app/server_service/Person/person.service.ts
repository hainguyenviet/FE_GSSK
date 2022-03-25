import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  //TODO: implement this URL for interacting with data
  //Example: "http://localhost:4200"
  URL = "https://run.mocky.io/v3/8fc644f7-de9e-4c36-a3fe-e184f74e4f70"

  constructor(private http: HttpClient) {}

  savePersonalInformation(data: any) {
    //TODO: update the "this.URL" following the URL for posting data
    return this.http.post(this.URL, data)
  }
}
