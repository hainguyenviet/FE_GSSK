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

  public inputForm!: FormGroup;
  public personForm!: FormGroup;
  public relatives_formGroup!: FormGroup;
  public illnessForm!: FormGroup;
  public addmore!: FormGroup;

  illNessGroup: any[] = [
    'Nhóm bệnh ung thư',
    'Nhóm bệnh huyết học',
    'Nhóm bệnh tim mạch',
    'Nhóm bệnh nội thần kinh/tâm thần',
    'Khác',
  ];
  illCancer: string[] = [
    'Ung thư vú',
    'Ung thư đại trực tràng',
    'Ung thư dạ dày',
    'Ung thư tử cung',
    'Ung thư tuyến giáp',
    'Ung thư máu',
  ];

  illHematology: string[] = [
    'Rối loạn đông máu',
    'Huyết khối tĩnh mạch sâu',
    'Thuyên tắc phổi',
    'Bệnh tăng cholesterol máu gia đình',
  ];

  illCardiovascular: string[] = [
    'Nhồi máu cơ tim',
    'Rối loạn nhịp',
    'Bệnh cơ tim giãn',
    'Đau thắt ngực',
  ];

  illNeurological: string[] = [
    'Rối loạn tâm thần',
    'Động kinh',
    'Rối loạn tăng động giảm chú ý',
    'Tự kỷ',
  ];

  illOther: string[] = [
    'Hen',
    'Loãng xương',
    'Đái tháo đường MODY',
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
      isTwin: null,
      isAdopted: null,
      height: ['', Validators.required],
      weight: ['', Validators.required],
      firstPeriodAge: null,
      birthControl: null,
      pregnantTime: null,
      firstBornAge: null,
      isSmoke: null,
      smokeTime: null,
      giveUpSmokeAge: null,
      wineVolume: null,
      workOutVolume: null,
      workOutType: null,
      illGroup: this.itemRows,
    });

    this.personForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      idCard: ['', Validators.required],
      email: ['', Validators.required],
      healthRecord: this.illnessForm,
      relativeList: this.relatives,
    });

    this.initItemRows();
    this.newRelative();

    
  }

  get itemRows() {
    return this.addmore.controls['itemRows'] as FormArray;
  }

  initItemRows() : FormGroup {
    return this.fb.group({
      code: null,
      illName: null,
      name:'',
      age_detected: null,
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
      gender: ['', Validators.required],
      idCard: [null],
      relation: ['', Validators.required],
      age: [null, Validators.required],
      familyOrder: [null],
      isDead: [null],
      dead_age: [null],
      deathCause:[null],
      relativeList: this.fb.array([this.newIllNess()]),
    });
  }

  addNewRelation() {
    this.index_of_relationship += 1;
    this.relatives.push(this.newRelative());
    if (
      this.relatives.value[this.index_of_relationship - 1].relation == 'Cậu' ||
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
      this.relatives.value[relativeIndex].gender = 'Nữ';
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
      this.relatives.value[relativeIndex].gender = 'Nam';
    }
  }

  selectIllNess(value: string, illNessIndex: number) {
    if (value == 'Ung thư vú') 
      this.itemRows.value[illNessIndex].name = 'BC1';
    if (value == 'Ung thư tuyến giáp') 
      this.itemRows.value[illNessIndex].name = 'TC';
    if (value == 'Ung thư máu') 
      this.itemRows.value[illNessIndex].name = 'BC2';
    if (value == 'Ung thư tử cung') 
      this.itemRows.value[illNessIndex].name = 'UC';
    if (value == 'Ung thư dạ dày') 
      this.itemRows.value[illNessIndex].name = 'SC1';
    if (value == 'Ung thư đại trực tràng') 
      this.itemRows.value[illNessIndex].name = 'CC';
    if (value == 'Rối loạn đông máu')
      this.itemRows.value[illNessIndex].name = 'BCD';
    if (value == 'Huyết khối tĩnh mạch sâu') 
      this.itemRows.value[illNessIndex].name = 'DVT';
    if (value == 'Thuyên tắc phổi') 
      this.itemRows.value[illNessIndex].name = 'PE';
    if (value == 'Bệnh tăng cholesterol máu gia đình') 
      this.itemRows.value[illNessIndex].name = 'FH';
    if (value == 'Nhồi máu cơ tim') 
      this.itemRows.value[illNessIndex].name = 'MI';
    if (value == 'Rối loạn nhịp') 
      this.itemRows.value[illNessIndex].name = 'CA2';
    if (value == 'Bệnh cơ tim giãn') 
      this.itemRows.value[illNessIndex].name = 'DCM';
    if (value == 'Đau thắt ngực')
      this.itemRows.value[illNessIndex].name = 'AP';
    if (value == 'Rối loạn tâm thần') 
      this.itemRows.value[illNessIndex].name = 'P';
    if (value == 'Động kinh') 
      this.itemRows.value[illNessIndex].name = 'E';
    if (value == 'Rối loạn tăng động giảm chú ý') 
      this.itemRows.value[illNessIndex].name = 'ADHD';
    if (value == 'Tự kỷ') 
      this.itemRows.value[illNessIndex].name = 'A1';
    if (value == 'Hen') 
      this.itemRows.value[illNessIndex].name = 'A2';
    if (value == 'Loãng xương') 
      this.itemRows.value[illNessIndex].name = 'O';
    if (value == 'Đái tháo đường MODY')
      this.itemRows.value[illNessIndex].name = 'MODY';
  }



  illNessList(empIndex: number): FormArray {
    return this.relatives.at(empIndex).get('relativeList') as FormArray;
  }

  newIllNess(): FormGroup {
    return this.fb.group({
      code: [null],
      illName: [''],
      name:[''],
      age_detected: [null],
    });
  }

  selectIllNessRelative(value: string, illNessIndex: number) {
    if (value == 'Ung thư vú') 
      this.illNessList(illNessIndex).value[illNessIndex].name = 'BC1';
    if (value == 'Ung thư tuyến giáp') 
      this.illNessList(illNessIndex).value[illNessIndex].name = 'TC';
    if (value == 'Ung thư máu') 
      this.illNessList(illNessIndex).value[illNessIndex].name = 'BC2';
    if (value == 'Ung thư tử cung') 
      this.illNessList(illNessIndex).value[illNessIndex].name = 'UC';
    if (value == 'Ung thư dạ dày') 
      this.illNessList(illNessIndex).value[illNessIndex].name = 'SC1';
    if (value == 'Ung thư đại trực tràng') 
      this.illNessList(illNessIndex).value[illNessIndex].name = 'CC';
    if (value == 'Rối loạn đông máu')
      this.illNessList(illNessIndex).value[illNessIndex].name = 'BCD';
    if (value == 'Huyết khối tĩnh mạch sâu') 
      this.illNessList(illNessIndex).value[illNessIndex].name = 'DVT';
    if (value == 'Thuyên tắc phổi') 
      this.illNessList(illNessIndex).value[illNessIndex].name = 'PE';
    if (value == 'Bệnh tăng cholesterol máu gia đình') 
      this.illNessList(illNessIndex).value[illNessIndex].name = 'FH';
    if (value == 'Nhồi máu cơ tim') 
      this.illNessList(illNessIndex).value[illNessIndex].name = 'MI';
    if (value == 'Rối loạn nhịp') 
      this.illNessList(illNessIndex).value[illNessIndex].name = 'CA2';
    if (value == 'Bệnh cơ tim giãn') 
      this.illNessList(illNessIndex).value[illNessIndex].name = 'DCM';
    if (value == 'Đau thắt ngực')
      this.illNessList(illNessIndex).value[illNessIndex].name = 'AP';
    if (value == 'Rối loạn tâm thần') 
      this.illNessList(illNessIndex).value[illNessIndex].name = 'P';
    if (value == 'Động kinh') 
      this.illNessList(illNessIndex).value[illNessIndex].name = 'E';
    if (value == 'Rối loạn tăng động giảm chú ý') 
      this.illNessList(illNessIndex).value[illNessIndex].name = 'ADHD';
    if (value == 'Tự kỷ') 
      this.illNessList(illNessIndex).value[illNessIndex].name = 'A1';
    if (value == 'Hen') 
      this.illNessList(illNessIndex).value[illNessIndex].name = 'A2';
    if (value == 'Loãng xương') 
      this.illNessList(illNessIndex).value[illNessIndex].name = 'O';
    if (value == 'Đái tháo đường MODY')
      this.illNessList(illNessIndex).value[illNessIndex].name = 'MODY';
  }

  addNewRowIllRelative(relativeIndex: number) {
    this.illNessList(relativeIndex).push(this.newIllNess());
  }

  deleteRowIllRelative(empIndex: number, illNessIndex: number) {
    this.illNessList(empIndex).removeAt(illNessIndex);
  }

  postPerson() {
    if (this.personForm.valid) {
      this.api.postPerson(this.personForm.value).subscribe({
        next: (res) => {
          sessionStorage.setItem('idUser', res.id.toString());
          this.api.convertGenogram(sessionStorage.getItem('idUser')!);
          alert('Person added successfully');
          this.personForm.reset();
        },
        error: () => {
          alert('Error');
        },
      });
    } else {
      alert('Hãy Điền Đầy Đủ Thông Tin Cần Thiết');
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
