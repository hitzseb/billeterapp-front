import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup
  user: User = Object()
  isLoading:boolean = false

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group
      (
        {
          email: '',
          password: ''
        }
      )
   }

  ngOnInit(): void {
    localStorage.clear()
  }

  onLogin() {
    this.user.email = this.form.get('email')?.value
    this.user.password = this.form.get('password')?.value
    this.authService.login(this.user)
  }

  show():void {
    this.isLoading = true
  }

}

