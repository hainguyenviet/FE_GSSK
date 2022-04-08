import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { relationship } from './relationship.model';

@Component({
  selector: 'app-relationship',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.scss']
})
export class RelationshipComponent implements OnInit {

  selectedValue: string;
  public relationship_formGroup !: FormGroup;
  public addmoreIllRelative !: FormGroup;

  relationships: any[] = ['Cha', 'Mẹ', 'Anh ruột', 'Em ruột', 'Chị ruột',
  'Cậu','Dì', 'Cô', 'Chú',
  'Ông ngoại','Bà ngoại', 'Ông nội', 'Bà nội',
    'Con ruột' 
  ]

  illNessGroup: any[] = ['Nhóm bệnh ung thư','Nhóm bệnh huyết học' ,'Nhóm bệnh tim mạch','Nhóm bệnh nội thần kinh/tâm thần','Khác'];
  ill: string [] = ['Ung thư đại tràng','Parkinson','Rối loạn tăng động giảm chú ý','Động kinh','Rối loạn nhịp'];
  list_of_sex: string[] = ['Nam', 'Nữ']
  orderFamily_option: any[] = ['Con cả', 'Con hai', 'Con ba', 'Khác']
  causeOfdeath: any[] = ['Tai nạn','Ung thư','Đái tháo đường','Bệnh tim mạch','Bệnh hô hấp','Nhiễm trùng','Đột quỵ','Đột tử trẻ sơ sinh (Sudant infant death syndrome – SIDS)','không có','khác']
  index_of_relationship = 0
  list_of_parent_nephew: any[] = []
  
  constructor(private _fb: FormBuilder) { 
    this.selectedValue = '';
  }

  ngOnInit() {
  	this.relationship_formGroup = this._fb.group({
      itemRowRelationship: this._fb.array([this.initItemRowsRelationship()])
    });
    
    this.addmoreIllRelative = this._fb.group({
      itemRowIllRelatives: this._fb.array([this.initItemRowsIllRelative()])
    });
  }

  get itemRowRelationship() {
    return this.relationship_formGroup.controls["itemRowRelationship"] as FormArray;
  }

  initItemRowsRelationship() {
    return this._fb.group({
      name:[''],
      sex:[''],
      idCard:[''],
      relation:[''],
      age:[''],
      orderFamily:[''],
      illNess: this._fb.array([])
    });
  }

  addNewRelation() {
    this.index_of_relationship += 1;
    this.itemRowRelationship.push(this.initItemRowsRelationship());
    if (this.itemRowRelationship.value[this.index_of_relationship - 1].relation == 'Cậu' ||
        this.itemRowRelationship.value[this.index_of_relationship - 1].relation == 'Cô'  ||
        this.itemRowRelationship.value[this.index_of_relationship - 1].relation == 'Dì'  ||
        this.itemRowRelationship.value[this.index_of_relationship - 1].relation == 'Chú') {
      if (this.relationships.indexOf('Anh/em họ') == -1)  // if not exist anh chị em họ then add them to relationship
      {   
          this.relationships.push('Anh/em họ');    
          this.relationships.push('Chị/em họ');
      }
      this.list_of_parent_nephew.push(this.itemRowRelationship.value[this.index_of_relationship - 1].name)
    }
  }

  removeRelation(index: number) {
    this.itemRowRelationship.removeAt(index);
  }
  
  selectRelation(value: string) {
    if (value == 'Mẹ' || 'Cô' || 'Dì' || 'Bà nội' || 'Bà ngoại' || 'Chị ruột' || 'Chị/em họ')
    {
      this.itemRowRelationship.value[this.index_of_relationship].sex = 'Nữ'
    }
    if (value == 'Cha' || 
        value == 'Cậu' || 
        value == 'Chú'|| 
        value == 'Anh ruột'||
        value == 'Ông nội' ||
        value == 'Ông ngoại' ||
        value == 'Anh/em họ')
    {
      this.itemRowRelationship.value[this.index_of_relationship].sex = 'Nam'
    }
  }

  get itemRowIllRelatives() {
    return this.addmoreIllRelative.controls["itemRowIllRelatives"] as FormArray;
  }

  initItemRowsIllRelative() {
    return this._fb.group({
      illGroup:[''],
      illName:[''],
      illAge:[''],
      dead:[''],
      deadAge:['',Validators.required],
    });
  }
  addNewRowIllRelative() {
    
  }

  deleteRowIllRelative(index: number) {
    
  }

}
