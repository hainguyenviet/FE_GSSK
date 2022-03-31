import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { illness } from './illness';

@Component({
  selector: 'app-illness',
  templateUrl: './illness.component.html',
  styleUrls: ['./illness.component.scss']
})
export class IllnessComponent implements OnInit {
  selectedValue: string;
  constructor() { 
    this.selectedValue = '';
  }
  illNessGroup: any[] = ['Nhóm bệnh ung thư','Nhóm bệnh huyết học' ,'Nhóm bệnh tim mạch','Nhóm bệnh nội thần kinh/tâm thần','Khác'];
  ill: string [] = ['Ung thư đại tràng','Parkinson','Rối loạn tăng động giảm chú ý','Động kinh','Rối loạn nhịp'];
  filteredOptions!: Observable<any[]>;
  
  index_of_relationship = 0
  list_of_parent_nephew: any[] = []
  illNessNew = new illness("","","");
  listOfIllNess  = [{
    illGroup:"",
    illName: "",
    illAge: ""
  }];
  
  ngOnInit() {
    
  }

  addNewRelation() {
    this.index_of_relationship += 1;
    this.illNessNew = new illness("","","");
    this.listOfIllNess.push(this.illNessNew)
     
  }
  
}
