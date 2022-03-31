import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { relationship } from './relationship.model';
import { illness } from '../illness/illness';
import { IllnessComponent } from '../illness/illness.component';
@Component({
  selector: 'app-relationship',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.scss']
})
export class RelationshipComponent implements OnInit {

 
  relationships: any[] = ['Cha', 'Mẹ', 'Anh ruột', 'Em ruột', 'Chị ruột',
  'Cậu','Dì', 'Cô', 'Chú',
  'Ông ngoại','Bà ngoại', 'Ông nội', 'Bà nội',
    'Con ruột' 
  ]
  list_of_sex: string[] = ['Nam', 'Nữ']
  orderFamily_option: any[] = ['Con cả', 'Con hai', 'Con ba', 'Khác']
  causeOfdeath: any[] = ['Tai nạn','Ung thư','Đái tháo đường','Bệnh tim mạch','Bệnh hô hấp','Nhiễm trùng','Đột quỵ','Đột tử trẻ sơ sinh (Sudant infant death syndrome – SIDS)','không có','khác']
  index_of_relationship = 0
  index_of_ill = 0
  list_of_parent_nephew: any[] = []
  relation = new relationship(1,"","",2,"","","");
  list_of_relationship  = [{id: 1,
    firstName: "",
    lastName: "",
    idCard: 1,
    relationship: "",
    orderFamily: "",
    sex: ""},];
  selected_sex = ''
  illNessGroup: IllNessList[] = [{'id': 1, 'name':'Nhóm bệnh ung thư'},{'id': 2,'name':'Nhóm bệnh huyết học'} ,{'id': 3, 'name':'Nhóm bệnh tim mạch'} ,{'id': 4, 'name':'Nhóm bệnh nội thần kinh/tâm thần'}];
  ill: string [] = ['Ung thư đại tràng','Parkinson','Rối loạn tăng động giảm chú ý','Động kinh','Rối loạn nhịp'];
  list_of_ill: string[] = [""]
  constructor() { 
  }

  ngOnInit(): void {
  }

  addNewRelation() {
    this.index_of_relationship += 1;
    this.relation = new relationship(2,"","",2,"","","");
    this.list_of_relationship.push(this.relation)
    if (this.list_of_relationship[this.index_of_relationship-1].relationship == 'Cậu' ||
        this.list_of_relationship[this.index_of_relationship-1].relationship == 'Cô'  ||
        this.list_of_relationship[this.index_of_relationship-1].relationship == 'Dì'  ||
        this.list_of_relationship[this.index_of_relationship-1].relationship == 'Chú') 
    {    
      if (this.relationships.indexOf('Anh/em họ') == -1)  // if not exist anh chị em họ then add them to relationship
      {   
          this.relationships.push('Anh/em họ');    
          this.relationships.push('Chị/em họ');
      }
      this.list_of_parent_nephew.push(this.list_of_relationship[this.index_of_relationship-1].firstName);
    } 
  }
  // addNewIll(){
  //   this.index_of_ill += 1;
  // }

  removeRelation() {
    if (this.list_of_relationship.length > 1)
    {
      this.list_of_relationship.pop()
    }
    
  }

  selectRelation(value: string){
  
    if (value == 'Mẹ' || 'Cô' || 'Dì' || 'Bà nội' || 'Bà ngoại' || 'Chị ruột' || 'Chị/em họ')
    {
      this.list_of_relationship[this.index_of_relationship].sex = 'Nữ';
    }
    if (value == 'Cha' || 
        value == 'Cậu' || 
        value == 'Chú'|| 
        value == 'Anh ruột'||
        value == 'Ông nội' ||
        value == 'Ông ngoại' ||
        value == 'Anh/em họ')
    {
      this.list_of_relationship[this.index_of_relationship].sex = 'Nam';
    }
  }
}
