import { Component, OnInit } from '@angular/core';
import { ProgressComponent } from '../progress/progress.component';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';

import { PersonService } from '../server_service/Person/person.service';

@Component({
  selector: 'app-home',
  templateUrl: './input-information.component.html',
  styleUrls: ['./input-information.component.scss'],
})
export class InputInformationComponent implements OnInit {
  constructor(private fb: FormBuilder, private api: PersonService) {}

  public inputForm !: FormGroup;
  public personForm !:FormGroup;
  public relatives_formGroup!: FormGroup;
  public illnessForm !: FormGroup;
  public addmore!: FormGroup;


  illNessGroup: any[] = [
    'Nhóm bệnh ung thư',
    'Nhóm bệnh huyết học',
    'Nhóm bệnh tim mạch',
    'Nhóm bệnh nội thần kinh/tâm thần',
    'Khác',
  ];
  ill: string[] = [
    'Ung thư đại tràng',
    'Parkinson',
    'Rối loạn tăng động giảm chú ý',
    'Động kinh',
    'Rối loạn nhịp',
  ];


  relationships: any[] = [
    'Cha',
    'Mẹ',
    'Anh ruột',
    'Em ruột',
    'Chị ruột',
    'Cậu',
    'Dì',
    'Cô',
    'Chú',
    'Ông ngoại',
    'Bà ngoại',
    'Ông nội',
    'Bà nội',
    'Con ruột',
  ];

  list_of_sex: string[] = ['Nam', 'Nữ'];
  orderFamily_option: any[] = ['Con cả', 'Con hai', 'Con ba', 'Khác'];
  causeOfdeath: any[] = [
    'Tai nạn',
    'Ung thư',
    'Đái tháo đường',
    'Bệnh tim mạch',
    'Bệnh hô hấp',
    'Nhiễm trùng',
    'Đột quỵ',
    'Đột tử trẻ sơ sinh (Sudant infant death syndrome – SIDS)',
    'không có',
    'khác',
  ];
  index_of_relationship = 0;
  list_of_parent_nephew: any[] = [];

  ngOnInit(): void {
    this.relatives_formGroup = this.fb.group({
      relatives: this.fb.array([this.newRelative()]),
    });

    this.addmore = this.fb.group({
      itemRows: this.fb.array([this.initItemRows()]),
    });

    this.illnessForm = this.fb.group({
      isTwin:[''],
      isAdopted: [''],
      height:['', Validators.required],
      weight: ['', Validators.required],
      firstPeriodAge:[''],
      birthControl: [''],
      pregnantTime: [''],
      firstBornAge:[''],
      isSmoke: [''],
      smokeTime:[''],
      giveUpSmokeAge:[''],
      wineVolume:[''],
      workOutVolume:[''],
      workOutType:[''],
      illGroup: this.itemRows,
    })

    this.personForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      idCard: ['', Validators.required],
      email: ['', Validators.required],
      healthRecord: this.illnessForm,
      relativeList: this.relatives
    })

    
  }

  get itemRows() {
    return this.addmore.controls['itemRows'] as FormArray;
  }

  initItemRows() {
    return this.fb.group({
      illGroup: [''],
      illName: [''],
      illAge: [''],
    });
  }
  addNewRow() {
    this.itemRows.push(this.initItemRows());
    
  }

  deleteRow(index: number) {
    this.itemRows.removeAt(index);
  }

  get relatives() {
    return this.relatives_formGroup.controls['relatives'] as FormArray;
  }

  newRelative(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      sex: ['', Validators.required],
      idCard: [''],
      relation: ['', Validators.required],
      age: ['', Validators.required],
      orderFamily: ['', Validators.required],
      dead: [''],
      deadAge: [''],
      illNessRelative: this.fb.array([this.newIllNess()]),
    });
  }

  addNewRelation() {
    this.index_of_relationship += 1;
    this.relatives.push(this.newRelative());
    if (
      this.relatives.value[this.index_of_relationship - 1].relation ==
        'Cậu' ||
      this.relatives.value[this.index_of_relationship - 1].relation == 'Cô' ||
      this.relatives.value[this.index_of_relationship - 1].relation == 'Dì' ||
      this.relatives.value[this.index_of_relationship - 1].relation == 'Chú'
    ) {
      if (this.relationships.indexOf('Anh/em họ') == -1) {
        // if not exist anh chị em họ then add them to relationship
        this.relationships.push('Anh/em họ');
        this.relationships.push('Chị/em họ');
      }
      this.list_of_parent_nephew.push(
        this.relatives.value[this.index_of_relationship - 1].name
      );
    }
  }

  removeRelation(relativeIndex: number) {
    this.relatives.removeAt(relativeIndex);
  }
  selectRelation(value: string, relativeIndex: number) {
    if (
      value == 'Mẹ' ||
      'Cô' ||
      'Dì' ||
      'Bà nội' ||
      'Bà ngoại' ||
      'Chị ruột' ||
      'Chị/em họ'
    ) {
      this.relatives.value[relativeIndex].sex = 'Nữ';
    }
    if (
      value == 'Cha' ||
      value == 'Cậu' ||
      value == 'Chú' ||
      value == 'Anh ruột' ||
      value == 'Ông nội' ||
      value == 'Ông ngoại' ||
      value == 'Anh/em họ'
    ) {
      this.relatives.value[relativeIndex].sex = 'Nam';
    }
  }
  illNessList(empIndex: number): FormArray {
    return this.relatives.at(empIndex).get('illNessRelative') as FormArray;
  }

  newIllNess(): FormGroup {
    return this.fb.group({
      illGroup: [''],
      illName: [''],
      illAge: [''],
    });
  }

  addNewRowIllRelative(relativeIndex: number) {
    this.illNessList(relativeIndex).push(this.newIllNess());
  }

  deleteRowIllRelative(empIndex: number, illNessIndex: number) {
    this.illNessList(empIndex).removeAt(illNessIndex);
  }




  postPerson() {

    if(this.personForm.valid){
      this.api.postPerson(this.personForm.value)
      .subscribe({
        next:(res)=>{
          sessionStorage.setItem('idUser', res.id.toString())
          this.api.convertGenogram(sessionStorage.getItem('idUser')!)
          alert('Person added successfully')
          this.personForm.reset();
        },
        error:()=>{
          alert("Error")
        }
      })
    }else{
      alert('Hãy Điền Đầy Đủ Thông Tin Cần Thiết')
    }
  }


  goNext(progress: ProgressComponent) {
    progress.next();
  }

  goPrev(progress: ProgressComponent) {
    progress.prev();
  }

  onStateChange(event: any) {
    console.log(event);
  }

}
