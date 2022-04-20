import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { relationship } from 'src/app/relationship/relationship.model';
@Injectable({
  providedIn: 'root'
})
export class RelativeService {
  baseURL = 'localhost:8080/person';
  constructor(private http: HttpClient) { }

  getAllRelatives() {
    return this.http.get<relationship>(this.baseURL)
  }

  saveRelativeInformation(relative: any) {
    return this.http.post<relationship>(this.baseURL, relative)
  }
}
