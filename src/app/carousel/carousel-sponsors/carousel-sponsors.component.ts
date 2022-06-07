import { Component, OnInit, Input } from '@angular/core';

interface carouselSponsors{
  imageSrc: string,
  imageAlt: string,
}

@Component({
  selector: 'app-carousel-sponsors',
  templateUrl: './carousel-sponsors.component.html',
  styleUrls: ['./carousel-sponsors.component.scss']
})



export class CarouselSponsorsComponent implements OnInit {

  constructor() { }

  @Input() sponsors: carouselSponsors[]=[]
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
      this.selectedIndex = this.sponsors.length-1
    }else{
      this.selectedIndex--;
    }
  }

  onNextClick(): void{
    if(this.selectedIndex === this.sponsors.length-1){
      this.selectedIndex=0;
    }else{
      this.selectedIndex++;
    }
  }

}
