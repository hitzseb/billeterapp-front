import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Operation} from "../interfaces/operation";
import { URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  API_URL: string = URL + '/api/v1'

  constructor(private http: HttpClient) { }

  getAllOperations(type?: string, categoryId?: number, date?: string): Observable<Operation[]> {
    let params = new HttpParams();
    if (type) {
      params = params.set('type', type);
    }
    if (categoryId) {
      params = params.set('categoryId', categoryId.toString());
    }
    if (date) {
      params = params.set('date', date);
    }

    const token = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<Operation[]>(this.API_URL + '/operation/all',
      { params, headers });
  }

  saveOperation(operation: any): Observable<any> {
    const token = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post(`${this.API_URL}/operation/new`, operation,
      { headers });
  }

  editOperation(id: number,
                description: string | null,
                amount: number | null,
                transaction: string | null,
                categoryId: number | null,
                date: string | null): Observable<any> {
    const token = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let url = `http://localhost:8080/api/v1/operation/${id}/edit?`;
    if (description) {
      url += `description=${description}&`;
    }
    if (amount != null) {
      url += `amount=${amount}&`;
    }
    if (transaction != null) {
      url += `transaction=${transaction}&`;
    }
    if (categoryId != null) {
      url += `categoryId=${categoryId}&`;
    }
    if (date) {
      url += `date=${date}&`;
    }
    url = url.slice(0, -1);
    return this.http.put(url, null, { headers });
  }

  deleteOperation(id:number):Observable<any> {
    const token = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete(`${this.API_URL}/operation/${id}/delete`,
      { headers });
  }

}
