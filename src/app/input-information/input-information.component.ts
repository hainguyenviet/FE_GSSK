import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProgressComponent } from '../progress/progress.component';

@Component({
  selector: 'app-home',
  templateUrl: './input-information.component.html',
  styleUrls: ['./input-information.component.scss'],
})
export class InputInformationComponent implements OnInit {
  constructor() {}
  @Output() scrollToTop = new EventEmitter<void>();
  ngOnInit(): void {}
  goNext(progress: ProgressComponent) {
    progress.next();
  }

  goPrev(progress: ProgressComponent) {
    progress.prev();
  }

  onStateChange(event: any) {
    console.log(event);
  }

  onScrollToTop(): void {
    this.scrollToTop.emit();
  }

  ngAfterViewInit() {}
}
