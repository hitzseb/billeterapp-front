import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Report} from "../interfaces/report";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  API_URL: string = 'https://hitzseb-wallet-wizard.onrender.com/api/v1'

  constructor(private http: HttpClient) { }

  getReports(): Observable<Report> {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<Report>(`${this.API_URL}/reports`, { headers });
  }
}
