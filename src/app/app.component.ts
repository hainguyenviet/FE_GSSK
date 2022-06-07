import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProgressComponent } from './progress/progress.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'demo';
  testForm = new FormGroup({
    food: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
  }
  );

 
  

  ngOnInit() {}

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
