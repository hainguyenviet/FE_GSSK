import { Component, OnInit } from '@angular/core';
import { DisclaimerComponent } from '../disclaimer/disclaimer.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
   
  }

  disclaimer(){
    
    const dialogRef = this.dialog.open(DisclaimerComponent)
    
  }
  

  ngAfterViewInit() {}
}
