import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Person } from '../server_service/model/Person';
import { PersonService } from '../server_service/Person/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

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
  constructor(private personService: PersonService) { }
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
      /* console.log(result.id) */
      sessionStorage.setItem('id', result.id.toString())
    }) 
    
   /*  console.log(data)
    this.personService.getAllPerson().subscribe(data =>{  
      console.log(data);
      this.person = data;  
    } ) */
  
   
}
}
