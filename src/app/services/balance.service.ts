import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Balance } from '../interfaces/balance';
import { URL } from '../constants';

@Injectable({
  providedIn: 'root'
})

export class BalanceService {

  private API_URL: string = URL + '/api/v1'

  constructor(private http: HttpClient) { }

  getBalance(): Observable<Balance> {
    const token = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<Balance>(`${this.API_URL}/balance`, { headers });
  }

}
