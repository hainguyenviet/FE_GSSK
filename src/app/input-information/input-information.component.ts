import { Component, OnInit } from '@angular/core';
import { ProgressComponent } from '../progress/progress.component';

@Component({
  selector: 'app-home',
  templateUrl: './input-information.component.html',
  styleUrls: ['./input-information.component.scss']
})
export class InputInformationComponent implements OnInit {
 
  constructor() { }

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
