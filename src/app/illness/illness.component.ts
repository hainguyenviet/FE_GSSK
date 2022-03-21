import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { IllNessList } from './illness';

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
  illNessGroup: IllNessList[] = [{'id': 1, 'name':'Nhóm bệnh ung thư'},{'id': 2,'name':'Nhóm bệnh huyết học'} ,{'id': 3, 'name':'Nhóm bệnh tim mạch'} ,{'id': 4, 'name':'Nhóm bệnh nội thần kinh/tâm thần'}];
  ill: string [] = ['Ung thư đại tràng','Parkinson','Rối loạn tăng động giảm chú ý','Động kinh','Rối loạn nhịp'];
  filteredOptions!: Observable<any[]>;
  illNessList!: Observable<any[]>;

  ngOnInit() {
    
  }

  
}
