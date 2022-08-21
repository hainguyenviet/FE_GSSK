import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { PersonService } from '../server_service/Person/person.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  personForm!: FormGroup;
  person: any;

  constructor(private api: PersonService, private _fb: FormBuilder) {}
  personList: any;
  get nameError() {
    if (this.personForm.get('firstName')?.hasError('required'))
      return 'Name field is required';

    if (this.personForm.get('firstName')?.hasError('whitespace'))
      return 'Please enter a valid Name';
    else return '';
  }
  get name() {
    return this.personForm.get('firstName') as FormControl;
  }
  ngOnInit() {
    this.personForm = this._fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(10),
        ],
      ],
      idCard: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
   // this.getAllPerson();
    //console.log(this.updatePerson.value)
  }
  get f() {
    return this.personForm.controls;
  }


}
