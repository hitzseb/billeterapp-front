import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../interfaces/category";
import { URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  API_URL: string = URL + '/api/v1'

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    const token = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<Category[]>(`${this.API_URL}/category/all`,
      { headers });
  }

  saveCategory(name: string): Observable<any> {
    const token = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post(`${this.API_URL}/category/new?name=${name}`, null,
      { headers });
  }

  editCategory(id: number, name: string | null): Observable<any> {
    const token = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let url = `http://localhost:8080/api/v1/category/${id}/edit`;
    if (name) {
      url += `?name=${name}`;
    }
    return this.http.put(url, null, { headers });
  }

  deleteCategory(id: number): Observable<any> {
    const token = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete(`${this.API_URL}/category/${id}/delete`,
      { headers });
  }

}
