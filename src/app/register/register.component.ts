import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../server_service/AuthService/auth.service';
import { NotificationService } from '../server_service/notification/notification.service';
import { MustMatch } from '../validators/customValidate';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup
  public userForm!: FormGroup
  submitted = false;
  public showPassword!: boolean
  spinnerButtonOptions: any = {
    active: false,
    text: 'Spinner Button',
    spinnerSize: 18,
    raised: true,
    buttonColor: 'primary',
    spinnerColor: 'accent'
  }
  constructor(private service: AuthService, private fb: FormBuilder, private router: Router, private notificate: NotificationService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: MustMatch('password', 'confirmPassword')
      });


  }

  get f() {
    return this.registerForm.controls;
  }

  acceptRegistrationForm(lastName: string, firstName: string, email: string, password: string) {
    this.userForm = this.fb.group({
      fullName: [lastName + " " + firstName],
      email: [email],
      password: [password]
    })

  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.acceptRegistrationForm(this.registerForm.value.lastName,
      this.registerForm.value.firstName,
      this.registerForm.value.email,
      this.registerForm.value.password)
    this.service.singup(this.userForm.value).subscribe({
      next: (data) => {
        this.router.navigateByUrl('/login')
        this.notificate.showSuccess('Đăng kí tài khoản thành công', 'Vui lòng đăng nhập để tiếp tục')
      },
      error: (error) => {
        this.notificate.showError("Email đã tồn tại", "Vui lòng sử dụng email khác hoặc đăng nhập để tiếp tục")
      }
    })
  }

}


