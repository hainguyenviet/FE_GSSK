import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { PersonService } from '../server_service/Person/person.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Person } from 'src/app/server_service/model/Person';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss'],
})
export class PersonDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute,private api: PersonService) {}
  username: any;
  personDetail: any
  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    this.api.getPerson(this.username).subscribe(
      (res: any) => {
        this.personDetail = res;
        console.log(this.personDetail);
        
      }
    )
    
    
  }

  

}
