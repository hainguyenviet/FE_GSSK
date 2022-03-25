import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../server_service/Person/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  person:FormGroup = new FormGroup({
    lastName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    phoneNumber: new FormControl(''),
    idNumber: new FormControl( '', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  })

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
  }

  getPersonalInfoData(data: any) {
    //COMMENT: the data here is the personal information that needs to be saved
    console.warn(data);
    this.personService.savePersonalInformation(data).subscribe((result) => {
      console.warn(result);
    })
  }

}
