import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../server_service/AuthService/auth.service';
import {SocialAuthService, SocialUser, GoogleLoginProvider} from 'angularx-social-login'
import { NotificationService } from '../server_service/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public loginForm!: FormGroup
  public showPassword!: boolean
  hide = true;
  constructor(private service: AuthService, 
    private fb: FormBuilder, 
    private router: Router, 
    private http: HttpClient, 
    private activeRoute: ActivatedRoute,
    private notificate: NotificationService) {
    
   }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    let body = '&username=' + this.loginForm.value.username  
                + '&password=' + this.loginForm.value.password
    this.service.login(body).subscribe({
      next: (data) => {
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('username', data.username )
        this.router.navigateByUrl('/input-information')
      },
      error: (error) => {
        this.notificate.showError("Email hoặc mật khẩu không đúng", "Vui lòng đăng nhập lại")
      }
    })
  }

  loginGoogle() {
    this.service.loginGoogle()
  }
 
}
