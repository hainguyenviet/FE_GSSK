import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-direct-confirm',
  templateUrl: './direct-confirm.component.html',
  styleUrls: ['./direct-confirm.component.scss']
})
export class DirectConfirmComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {   
      localStorage.setItem('confirm-token', params.token)
      this.router.navigateByUrl('/confirm_password')
    });
  }

}
