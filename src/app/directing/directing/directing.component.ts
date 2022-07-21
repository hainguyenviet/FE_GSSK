import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-directing',
  templateUrl: './directing.component.html',
  styleUrls: ['./directing.component.scss']
})
export class DirectingComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    
   }

  ngOnInit(): void {
 
    this.activatedRoute.params.subscribe(params => {   
      localStorage.setItem('access_token', params.token)
      localStorage.setItem('username', params.username)
      this.router.navigateByUrl('input-information')
    });
  
  }

}
