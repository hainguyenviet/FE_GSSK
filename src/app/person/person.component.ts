import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Person } from '../server_service/model/Person';
import { PersonService } from '../server_service/Person/person.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DatePipe } from '@angular/common'
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';

export const MY_DATE_FORMATS = {
    parse: {
      dateInput: 'DD/MM/YYYY',
    },
    display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY'
    },
};
@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})

export class PersonComponent implements OnInit {

    dateOfBirth = new Date();
    updatePerson:FormGroup = new FormGroup({
    lastName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    phoneNumber: new FormControl(''),
    idCard: new FormControl( '', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  })
  person: any

  constructor(private personService: PersonService, private dateAdapter: DateAdapter<Date>) { 
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

personList: any
  ngOnInit(): void {
      this.personService.getAllPerson().subscribe((res: any) => {
      this.personList = res
      // show list person  
      console.log(this.personList)
    })
  }


   getPersonalInfoData(data: any) {
    //COMMENT: the data here is the personal information that needs to be saved
    /*  console.warn(data); */
    this.personService.savePersonalInformation(data).subscribe((result) => {
      
      // show console value id 
      console.log(result)
      sessionStorage.setItem('id', result.id.toString())
    }) 
    
   /*  console.log(data)
    this.personService.getAllPerson().subscribe(data =>{  
      console.log(data);
      this.person = data;  
    } ) */
  
   
}
}
