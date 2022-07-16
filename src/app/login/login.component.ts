import { HttpErrorResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from '../server_service/AuthService/auth.service';
import {SocialAuthService, SocialUser, GoogleLoginProvider} from 'angularx-social-login'
const googleLogoURL = 
"https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  //user!: gapi.auth2.GoogleUser
  public loginForm!: FormGroup
  
  constructor(private service: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    // this.service.observable().subscribe(user => {
    //   this.user = user
    // })
  }

  login() {
    let body = '&username=' + this.loginForm.value.username  
                + '&password=' + this.loginForm.value.password
    this.service.login(body).subscribe({
      next: (data) => {
        localStorage.setItem('access_token', data.access_token)
        this.router.navigateByUrl('/input-information')
      }
    })
  }

  signinWithGG() {
    //localStorage.removeItem('tokenGG')
    this.service.signInGG()
  }
 
}
