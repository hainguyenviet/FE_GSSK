import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode'
@Component({
  selector: 'app-directing',
  templateUrl: './directing.component.html',
  styleUrls: ['./directing.component.scss']
})
export class DirectingComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    
   }
   getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
  ngOnInit(): void {
 
    this.activatedRoute.params.subscribe(params => {   
      localStorage.setItem('access_token', params.token)
      localStorage.setItem('username', params.email)
      const tokenInfo = this.getDecodedAccessToken(params.token)
      const role = tokenInfo.role[0]
      localStorage.setItem('ROLE', role)
      if (role === "USER")
      {
        this.router.navigateByUrl('/input-information')
      }
      
    });
  
  }

}
