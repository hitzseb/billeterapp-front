import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL: string = 'https://hitzseb-wallet-wizard.onrender.com/api/v1'

  constructor(private httpClient: HttpClient, private router:Router) { }

  public isLoggedIn(): boolean {
    return localStorage.getItem("AUTH") == 'true';
  }

  public register(user: User) {
    return this.httpClient.post(`${this.API_URL}/registration`, user).subscribe(() => {this.router.navigateByUrl('/login')});
  }

  public login(user: User): any {
    return this.httpClient.post(`${this.API_URL}/authenticate`, user).subscribe((res: any) => {
      window.localStorage.setItem("ACCESS_TOKEN", res.jwt),
        window.localStorage.setItem("AUTH", "true"),
        this.router.navigateByUrl('/balance')
    })
  }

  public logout(): void {
    window.localStorage.clear();
  }
}
