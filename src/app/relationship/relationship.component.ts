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

  relationship: any[] = [
    'con ruột', 'anh ruột', 'em ruột', 'chị ruột', 'cô', 'dì', 'chú','ông ngoại','bà ngoại', 'cha','mẹ','ông nội', 'bà nội'
  ]

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
  illNessGroup: any[] = ['Nhóm bệnh ung thư','Nhóm bệnh huyết học' ,'Nhóm bệnh tim mạch','Nhóm bệnh nội thần kinh/tâm thần','Khác'];
  ill: string [] = ['Ung thư đại tràng','Parkinson','Rối loạn tăng động giảm chú ý','Động kinh','Rối loạn nhịp'];
  list_of_ill: string[] = [""]
  constructor() { 
  }
  constructor() { }

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
