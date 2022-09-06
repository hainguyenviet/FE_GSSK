import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/server_service/AuthService/auth.service';
import { NotificationService } from 'src/app/server_service/notification/notification.service';
import { MustMatch } from 'src/app/validators/customValidate';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent implements OnInit {
  confirmForm!: FormGroup
  submitted = false
  constructor(private route: Router, 
    private fb: FormBuilder, 
    private authService: AuthService, 
    private notificate: NotificationService) { }

  ngOnInit(): void {
    this.confirmForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: MustMatch('password', 'confirmPassword') 
    })
  }
  get f() {
    return this.confirmForm.controls;
  }

  onSubmit() {
    this.submitted = true
    if (this.confirmForm.invalid)
    {return;}
    let token = localStorage.getItem('confirm-token')
    let bodyRequest = {"token": token, "password": this.confirmForm.controls['password'].value}
    this.authService.resetPassword(bodyRequest).subscribe({
      next: (data) => {
        this.route.navigateByUrl("/login")
        this.notificate.showSuccess("Reset mật khẩu thành công", "Vui lòng đăng nhập để tiếp tục")
      }
    })

  }
}
