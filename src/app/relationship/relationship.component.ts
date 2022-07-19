import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { relationship } from './relationship.model';

@Component({
  selector: 'app-relationship',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.scss']
})
export class RelationshipComponent implements OnInit {

  public relatives_formGroup !: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
   
  }

  relationships: any[] = ['Cha', 'Mẹ', 'Anh ruột', 'Em ruột', 'Chị ruột',
    'Cậu', 'Dì', 'Cô', 'Chú',
    'Ông ngoại', 'Bà ngoại', 'Ông nội', 'Bà nội',
    'Con ruột'
  ]

  illNessGroup: any[] = ['Nhóm bệnh ung thư', 'Nhóm bệnh huyết học', 'Nhóm bệnh tim mạch', 'Nhóm bệnh nội thần kinh/tâm thần', 'Khác'];
  ill: string[] = ['Ung thư đại tràng', 'Parkinson', 'Rối loạn tăng động giảm chú ý', 'Động kinh', 'Rối loạn nhịp'];
  list_of_sex: string[] = ['Nam', 'Nữ']
  orderFamily_option: any[] = ['Con cả', 'Con hai', 'Con ba', 'Khác']
  causeOfdeath: any[] = ['Tai nạn', 'Ung thư', 'Đái tháo đường', 'Bệnh tim mạch', 'Bệnh hô hấp', 'Nhiễm trùng', 'Đột quỵ', 'Đột tử trẻ sơ sinh (Sudant infant death syndrome – SIDS)', 'không có', 'khác']
  index_of_relationship = 0
  list_of_parent_nephew: any[] = []


  

  ngOnInit() {
    this.relatives_formGroup = this.fb.group({
      relatives: this.fb.array([this.newRelative()])
    });
    this.http.get('')
      .subscribe( () => {
        this.relatives_formGroup = this.fb.group({
          relatives: this.fb.array(data.map(datum => this.generateDatumFormGroup(datum)))
        });
      });
  }
  enableSection(index: any, disabled: any) {
    const relatives_formGroup = (<FormArray>this.relatives_formGroup.get('relatives')).at(index);
    disabled ? relatives_formGroup.enable() : relatives_formGroup.disable();
  }
  
  private generateDatumFormGroup(datum: any) {
    return this.fb.group({
      relation: this.fb.control({ value: datum.relation, disabled: true }),
      name: this.fb.control({ value: datum.name, disabled: true }),
      sex: this.fb.control({ value: datum.sex, disabled: true }),
      idCard: this.fb.control({ value: datum.idCard, disabled: true }),     
      age: this.fb.control({ value: datum.age, disabled: true }),   
      orderFamily: this.fb.control({ value: datum.orderFamily, disabled: true }),
      illGroup: this.fb.control({ value: datum.illGroup, disabled: true }),
      illName: this.fb.control({ value: datum.illName, disabled: true }),
      illAge: this.fb.control({ value: datum.illAge, disabled: true }),
      deadAge: this.fb.control({ value: datum.deadAge, disabled: true }),
      dead: this.fb.control({ value: datum.dead, disabled: true })
    });
  }

  relatives(): FormArray {
    return this.relatives_formGroup.get('relatives') as FormArray;
  }

  newRelative(): FormGroup {
    return this.fb.group({
            name:[''],
            sex:'',
            idCard:'',
            relation:'',
            age:'',
            orderFamily:[''],
            illNessRelative: this.fb.array([this.newIllNess()])
          });
  }

  addNewRelation() {
    this.index_of_relationship += 1;
    this.relatives().push(this.newRelative());
    if (this.relatives().value[this.index_of_relationship - 1].relation == 'Cậu' ||
          this.relatives().value[this.index_of_relationship - 1].relation == 'Cô'  ||
          this.relatives().value[this.index_of_relationship - 1].relation == 'Dì'  ||
          this.relatives().value[this.index_of_relationship - 1].relation == 'Chú') {
          if (this.relationships.indexOf('Anh/em họ') == -1)  // if not exist anh chị em họ then add them to relationship
          {   
              this.relationships.push('Anh/em họ');    
              this.relationships.push('Chị/em họ');
          }
          this.list_of_parent_nephew.push(this.relatives().value[this.index_of_relationship - 1].name)
        }
  }

  removeRelation(relativeIndex: number) {
    this.relatives().removeAt(relativeIndex);
  }
  selectRelation(value: string, relativeIndex: number) {
    if (value == 'Mẹ' || 'Cô' || 'Dì' || 'Bà nội' || 'Bà ngoại' || 'Chị ruột' || 'Chị/em họ')
    {
      this.relatives().value[relativeIndex].sex = 'Nữ'
    }
    if (value == 'Cha' || 
        value == 'Cậu' || 
        value == 'Chú'|| 
        value == 'Anh ruột'||
        value == 'Ông nội' ||
        value == 'Ông ngoại' ||
        value == 'Anh/em họ')
    {
      this.relatives().value[relativeIndex].sex = 'Nam'
    }
  }
  illNessList(empIndex: number): FormArray {
    return this.relatives()
      .at(empIndex)
      .get('illNessRelative') as FormArray;
  }

  newIllNess(): FormGroup {
    return this.fb.group({
            illGroup:[''],
            illName:[''],
            illAge:[''],
            dead:[''],
            deadAge:['',Validators.required],
          });
  }

  addNewRowIllRelative(relativeIndex: number) {
    this.illNessList(relativeIndex).push(this.newIllNess());
  }

  deleteRowIllRelative(empIndex: number, illNessIndex: number) {
    this.illNessList(empIndex).removeAt(illNessIndex);
  }
}