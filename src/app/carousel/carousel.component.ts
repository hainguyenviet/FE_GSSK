import { Component, OnInit, Input } from '@angular/core';
import{faArrowAltCircleLeft,faArrowCircleRight} from'@fortawesome/free-solid-svg-icons'
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
interface carouselImage{
  imageSrc: string,
  imageAlt: string,
  des: string,
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})



export class CarouselComponent implements OnInit {
  faCoffee = faCoffee;
  arrowLeft=faArrowAltCircleLeft;
  arrowRight=faArrowCircleRight;
  constructor() { }

  @Input() images: carouselImage[]=[]
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
      this.selectedIndex = this.images.length-1
    }else{
      this.selectedIndex--;
    }
  }

  onNextClick(): void{
    if(this.selectedIndex === this.images.length-1){
      this.selectedIndex=0;
    }else{
      this.selectedIndex++;
    }
  }

}