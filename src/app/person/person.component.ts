import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PersonService } from '../server_service/Person/person.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  personForm !: FormGroup 
  person: any;
  constructor(private api: PersonService,private _fb: FormBuilder) {}
  personList: any;
  ngOnInit(){
    this.personForm = this._fb.group({
    lastName: ['', Validators.required],
    firstName:  ['', Validators.required],
    gender:  ['', Validators.required],
    dateOfBirth:  ['', Validators.required],
    phoneNumber:  ['', Validators.required],
    idCard:  ['', Validators.required],
    email:  ['', Validators.required],
    }) 

    this.getAllPerson();
    //console.log(this.updatePerson.value)
  }
  
  public getAllPerson(): void {
    this.api.getAllPerson().subscribe((res: any) => {
      this.personList = res;
      // show list person
      //console.log(this.personList)
    },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      )
  }
  postPerson() {
    if(this.personForm.valid){
      this.api.postPerson(this.personForm.value)
      .subscribe({
        next:(res)=>{
          alert('Person added successfully')
          this.personForm.reset();
        },
        error:()=>{
          alert("Error")
        }
      })
    }
  }

}