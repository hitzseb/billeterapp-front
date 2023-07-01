import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL: string = URL + '/api/v1';

  constructor(private httpClient: HttpClient, private router:Router) { }

  public isLoggedIn() {
    const token = sessionStorage.getItem('ACCESS_TOKEN');
    if (!token) {
      this.router.navigate(['/login']);
    }
  }


  public register(user: User) {
    return this.httpClient.post(`${this.API_URL}/registration`, user).subscribe(() => {this.router.navigateByUrl('/login')});
  }

  public login(user: User): any {
    return this.httpClient.post(`${this.API_URL}/authenticate`, user).subscribe((res: any) => {
      window.sessionStorage.setItem("ACCESS_TOKEN", res.jwt),
      this.router.navigateByUrl('/balance')
    })
  }

}
