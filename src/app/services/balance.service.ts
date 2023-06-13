import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Balance } from '../interfaces/balance';

@Injectable({
  providedIn: 'root'
})

export class BalanceService {

  API_URL: string = 'https://hitzseb-wallet-wizard.onrender.com/api/v1'

  constructor(private http: HttpClient) { }

  getBalance(): Observable<Balance> {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<Balance>(`${this.API_URL}/balance`, { headers });
  }

}
