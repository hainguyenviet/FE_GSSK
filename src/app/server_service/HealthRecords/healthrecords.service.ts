import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HealthRecord } from '../model/HealthRecord';

@Injectable({
  providedIn: 'root',
})
export class HealthrecordsService {
  constructor(private http: HttpClient) {}

  baseURL = 'http://localhost:8080/';

  saveInformation(healthrecords: HealthRecord) {
    //TODO: update the "this.URL" following the URL for posting data
    return this.http.post<HealthRecord>(this.baseURL + 'person', healthrecords);
  }
}
