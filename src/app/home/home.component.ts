
import { Component, OnInit } from '@angular/core';
import { ProgressComponent } from '../progress/progress.component';
import { DisclaimerComponent } from '../disclaimer/disclaimer.component';
import{CarouselComponent} from '../carousel/carousel.component'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import{MatCarousel, MatCarouselComponent} from '@ngmodule/material-carousel'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  

  images=[
    {
      imageSrc: 'https://res.cloudinary.com/mp-cloud/image/upload/v1652341520/Rectangle_8485_qnxidm.png',
      imageAlt :'lmphu',
      des: 'GSSK/Cây gia hệ là chân dung sức khỏe của gia đình có thể được dự báo trong tương lai khi phân tích quá khứ'
    },
    {
      imageSrc: 'https://res.cloudinary.com/mp-cloud/image/upload/v1652341520/Rectangle_8485_1_suet3x.png',
      imageAlt:'lmphu123',
      des: 'Xét nghiệm gen là lý do thúc đẩy việc thu thập và sử dụng GSSK'
  },
  {
    imageSrc: 'https://res.cloudinary.com/mp-cloud/image/upload/v1652341520/Rectangle_8485_2_dqwqvr.png',
    imageAlt :'lmphu',
    des: 'Với tình yêu và trách nhiệm với gia đình ai cũng có thể làm GSSK cho gia đình mình'
  },
  {
    imageSrc: 'https://res.cloudinary.com/mp-cloud/image/upload/v1652341520/Rectangle_8485_3_j1o4xt.png',
    imageAlt:'lmphu123',
    des: 'GSSK chỉ hữu ích thật sự khi được chia sẻ với Nhà tư vấn di truyền BSGĐ để lượng giá nguy cơ bệnh tật'
}
  ]

  locationMap: any[] = [
    'Miền Bắc',
    'Miền Trung',
    'Miền Nam',
  ];
  
  constructor(private dialog: MatDialog) { 
    library.add(fas,faArrowCircleLeft);
  }

  ngOnInit(): void {
    if (localStorage.getItem('access_token') != null)
    {
      localStorage.removeItem('access_token')
    }
    if (localStorage.getItem('username') != null)
    {
      localStorage.removeItem('username')
    }
    console.log("USERNAME", localStorage.getItem('username'))
  }

  disclaimer(){ 
    const dialogRef= this.dialog.open(DisclaimerComponent)
  }
 

  ngAfterViewInit() {}
}