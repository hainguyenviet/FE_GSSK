import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { illness } from '../model/Illness';
@Injectable({
  providedIn: 'root',
})
export class IllnessService {
  baseURL = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}

  savePersonalInformation(illness: illness) {
    //TODO: update the "this.URL" following the URL for posting data
    return this.http.post<illness>(this.baseURL + 'person', illness);
  }
}
