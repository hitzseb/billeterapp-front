import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup
  user: User = Object()
  invalidData:boolean = false

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router) {
    this.form = this.formBuilder.group
      (
        {
          email: ['', [Validators.required, Validators.email]],
          password1: ['', [Validators.required, Validators.minLength(8)]],
          password2: ['', [Validators.required, Validators.minLength(8)]]
        }
      )
  }

  ngOnInit(): void { }

  onRegister() {
    if(!this.form.valid || this.form.get('password1')?.value != this.form.get('password2')?.value) {
      this.invalidData = true
    }
    else {
      this.user.email = this.form.get('email')?.value
      this.user.password = this.form.get('password1')?.value
      this.authService.register(this.user)
      this.router.navigateByUrl('/login')
    }
  }

}
