import { Component, OnInit } from '@angular/core';
import { ProgressComponent } from '../progress/progress.component';
import { DisclaimerComponent } from '../disclaimer/disclaimer.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './input-information.component.html',
  styleUrls: ['./input-information.component.scss']
})
export class InputInformationComponent implements OnInit {
 
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

  
  

  ngAfterViewInit() {}
}
