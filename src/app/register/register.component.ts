import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../server_service/AuthService/auth.service';
import { userRegisterForm } from '../server_service/model/registerForm';
import { CustomValidators } from '../validators/customValidate';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup
  constructor(private service: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: [''],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  register() {
    this.service.singup(this.registerForm.value).subscribe({next: (data) => {
      this.router.navigateByUrl('/login')
    },
    error: (error) => {
      alert("Đăng kí không thành công. Xin vui lòng đăng kí lại")
    }})
  }
}
