import { Component, OnInit } from '@angular/core';
import { ProgressComponent } from '../progress/progress.component';
import { DisclaimerComponent } from '../disclaimer/disclaimer.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
   
  }
  goNext(progress: ProgressComponent) {
    progress.next();
  }

  goPrev(progress: ProgressComponent) {
    progress.prev();
  }

  onStateChange(event: any) {
    console.log(event);
  }

  disclaimer(){
    
    const dialogRef= this.dialog.open(DisclaimerComponent)
    
  }
  

  ngAfterViewInit() {}
}