import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../server_service/Person/person.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Person } from 'src/app/server_service/model/Person';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private api: PersonService,
  ) { }

  data: Person[]=[];

  ngOnInit(): void {
    this.getAllPerson();
  }

  public getAllPerson(): void {
    this.api.getAllPerson().subscribe(
      (res: any) => {
        console.log(res);
        this.data = res;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
