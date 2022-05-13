import { Component, OnInit, Input } from '@angular/core';


interface carouselAction{
  imageSrc: string,
  imageAlt: string,
  des: string,
}

@Component({
  selector: 'app-carousel-action',
  templateUrl: './carousel-action.component.html',
  styleUrls: ['./carousel-action.component.scss']
})



export class CarouselActionComponent implements OnInit {

  constructor() { }

  @Input() actions: carouselAction[]=[]
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide= false;
  @Input() slideInterval = 6000
  selectedIndex=0;

  ngOnInit(): void {
    if(this.autoSlide){
      this.autoSlideImages();
    }
  }

  autoSlideImages(): void{
    setInterval(()=>{
      this.onNextClick();

    },this.slideInterval)
  }
  selectImage(index:number): void {
    this.selectedIndex = index;
  }

  onPrevClick(): void{
    if(this.selectedIndex===0){
      this.selectedIndex = this.actions.length-1
    }else{
      this.selectedIndex--;
    }
  }

  onNextClick(): void{
    if(this.selectedIndex === this.actions.length-1){
      this.selectedIndex=0;
    }else{
      this.selectedIndex++;
    }
  }

}
