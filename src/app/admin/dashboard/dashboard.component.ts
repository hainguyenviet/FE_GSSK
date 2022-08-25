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
  page: number = 1;
  count: any;
  pageSize: number = 2;
  pageSizes: any = [5, 10, 25, 50, 100];

  ngOnInit(): void {
    this.getAllPerson();
    this.getCountAllPerson()
    
    
  }

  public getAllPerson(): void {
    this.api.getAllPerson().subscribe(
      (res: any) => {
        this.data = res;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getCountAllPerson(): void {
    this.api.getCountAllPerson().subscribe(
      (res: any) => {
        this.count = res;
        console.log(this.count);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onTableDataChange(event: any): void{
    this.page = event;
    this.getAllPerson();
  }


  onTableSizeChange(event: any): void{
    this.pageSize= event.target.value;
    this.page = 1;
    this.getAllPerson();
  }

}
