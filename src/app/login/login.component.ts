import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../server_service/AuthService/auth.service';
import {SocialAuthService, SocialUser, GoogleLoginProvider} from 'angularx-social-login'
import jwt_decode from 'jwt-decode'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public loginForm!: FormGroup
  
  constructor(private service: AuthService, private fb: FormBuilder, private router: Router, private http: HttpClient, private activeRoute: ActivatedRoute) {
    
   }

  ngOnInit(): void {
    console.log("USERNAME LOGIN: ", localStorage.getItem('username'))
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  login() {
    let body = '&username=' + this.loginForm.value.username  
                + '&password=' + this.loginForm.value.password
    this.service.login(body).subscribe({
      next: (data) => {
        
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('username', data.username )
        console.log("USERNAME MANUAL: ", localStorage.getItem('username'))
        const tokenInfo = this.getDecodedAccessToken(data.access_token)
        const role = tokenInfo.role[0]
        localStorage.setItem('ROLE', role)
        if (role === "ADMIN")
        {
          this.router.navigateByUrl('/admin')
        }
        else if (role === "USER") 
        {
          this.router.navigateByUrl('/input-information')
        }
      }
    })
  }

  loginGoogle() {
    this.service.loginGoogle()
  }
 
}
