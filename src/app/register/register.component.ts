import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../server_service/AuthService/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup
  constructor(private service: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: [''],
      email: [''],
      password: ['']
    })
  }

  register() {
    //console.log("register Form:", this.registerForm.value)
    this.service.singup(this.registerForm.value).subscribe({next: (data) => {
      console.log("register return: ", data)
    },
    error: () => {
      alert("Error")
    }})
  }
}
