import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { illness } from '../model/Illness';
@Injectable({
  providedIn: 'root',
})
export class IllnessService {
    //baseURL = 'http://localhost:8080/';
    baseURL = 'http://giasusuckhoe.vn/';
  constructor(private http: HttpClient) {}

  postIllness(data: any) {
    return this.http.post<any>(`${this.baseURL}/person`,data);
  }
}
