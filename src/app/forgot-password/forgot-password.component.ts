import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../server_service/AuthService/auth.service';
import { NotificationService } from '../server_service/notification/notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email: string = ""
  constructor(private route: Router, private authService: AuthService, private notificate: NotificationService) { }

  ngOnInit(): void {
  }
  confirm() {
    let title = "Email hướng dẫn tạo mật khẩu đã được gửi đến "
    let message = "Hãy kiểm tra email và làm theo hướng dẫn. Nếu không thấy email trong hộp thư đến (inbox), vui lòng kiểm tra hộp thư Spam hoặc Junk Folder."
    this.authService.forgotPassword({"email" :this.email}).subscribe({
      next: (data) => {
        this.notificate.showInfo(title + this.email, message)
        this.route.navigateByUrl("/login")
      }
    })
  }

}
