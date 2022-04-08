import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  
  person:FormGroup = new FormGroup({
    ho: new FormControl(),
    ten: new FormControl(),
    gioitinh: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email])

  })

 
  constructor() { }

  ngOnInit(): void {
  }

}
