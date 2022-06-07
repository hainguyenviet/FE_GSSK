import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProgressComponent } from './progress/progress.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'demo';
  testForm = new FormGroup({
    food: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
  });

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
  onActivate(event: any) {
    // window.scroll(0,0);

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    //or document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)
  }

  ngAfterViewInit() {}
}
