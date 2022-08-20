import { Component, OnInit } from '@angular/core';
import { ProgressComponent } from '../progress/progress.component';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { DisclaimerComponent } from '../disclaimer/disclaimer.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DatePipe } from '@angular/common'
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';

import { PersonService } from '../server_service/Person/person.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-home',
  templateUrl: './input-information.component.html',
  styleUrls: ['./input-information.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class InputInformationComponent implements OnInit {

  //  bsValue = new Date();
  constructor(
    private fb: FormBuilder,
    private api: PersonService,
    private dialog: MatDialog,
    private router: Router,
    private dateAdapter: DateAdapter<Date>,

  ) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

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
  ];
  illCancer: string[] = [
    'Ung thư vú',
    'Ung thư đại trực tràng',
    'Ung thư dạ dày',
    'Ung thư tử cung',
    'Ung thư tuyến giáp',
    'Ung thư máu',
    'Khác',
  ];

  illHematology: string[] = [
    'Rối loạn đông máu',
    'Huyết khối tĩnh mạch sâu',
    'Thuyên tắc phổi',
    'Bệnh tăng cholesterol máu gia đình',
    'Khác',
  ];

  illCardiovascular: string[] = [
    'Nhồi máu cơ tim',
    'Rối loạn nhịp',
    'Bệnh cơ tim giãn',
    'Đau thắt ngực',
    'Khác',
  ];

  illNeurological: string[] = [
    'Rối loạn tâm thần',
    'Động kinh',
    'Rối loạn tăng động giảm chú ý',
    'Tự kỷ',
    'Khác',
  ];

  illOther: string[] = ['Hen', 'Loãng xương', 'Đái tháo đường MODY', 'Khác',];

  relationships: any[] = [
    'Cha',
    'Mẹ',
    'Chồng',
    'Vợ',
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
  personList = {
    lastName: '',
    firstName: '',
    gender: '',
    dateOfBirth: '',
    phoneNumber: '',
    idCard: '',
    email: '',
    healthRecord: {
      relationship: null,
      isTwin: null,
      isAdopted: null,
      height: '',
      weight: '',
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
      illnessList: [
        {
          code: '',
          illName: '',
          illNameOther: '',
          name: '',
          age_detected: '',
        },
      ],
    },
    relativeList: [
      {
        name: '',
        gender: '',
        idCard: null,
        relation: '',
        age: null,
        familyOrder: '',
        familyOrderOther: '',
        isDead: null,
        dead_age: null,
        deathCause: '',
        illnessRelative: [
          {
            code: '',
            illName: '',
            illNameOther: null,
            name: '',
            age_detected: '',
          },
        ],
      },
    ],
  };
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
  ress = {};
  dateOfBirth = new Date();

  username: string = ""
  

  ngOnInit(): void {
    this.disclaimer();
    this.username = localStorage.getItem('username')!
    this.api.getAllPerson(this.username).subscribe(
      (res: any) => {
        this.personList = res;
        this.addmore = this.fb.group({
          itemRows: this.fb.array(this.personList.healthRecord.illnessList.map(datum => this.generateDatumFormGroup(datum))),
        });

        this.illnessForm = this.fb.group({
          isTwin: res.healthRecord.isTwin,
          isAdopted: res.healthRecord.isAdopted,
          relationship: res.healthRecord.relationship,
          height: [res.healthRecord.height],
          weight: [res.healthRecord.weight],
          firstPeriodAge: res.healthRecord.firstPeriodAge,
          birthControl: res.healthRecord.birthControl,
          pregnantTime: res.healthRecord.pregnantTime,
          firstBornAge: res.healthRecord.firstBornAge,
          isSmoke: res.healthRecord.isSmoke,
          smokeTime: res.healthRecord.smokeTime,
          giveUpSmokeAge: res.healthRecord.giveUpSmokeAge,
          wineVolume: res.healthRecord.wineVolume,
          workOutVolume: res.healthRecord.workOutVolume,
          workOutType: res.healthRecord.workOutType,
          illnessList: this.itemRows,
        });


        this.relatives_formGroup = this.fb.group({
          relatives: this.fb.array(
            this.personList.relativeList.map((datum) =>
              this.generateDatumRelativeFormGroup(datum)
              )
              ),
          });
          
        //  let date = new DatePipe('en-US').transform(this.personList.dateOfBirth, 'dd/MM/yyyy')
          this.personForm = this.fb.group({
            lastName: [this.personList.lastName||null, Validators.required],
            firstName: [this.personList.firstName, Validators.required],
            gender: [this.personList.gender, Validators.required],
            dateOfBirth: [this.personList.dateOfBirth, Validators.required],
            phoneNumber: [this.personList.phoneNumber, Validators.required],
            idCard: [this.personList.idCard, Validators.required],
            email: [this.personList.email, Validators.required],
            healthRecord: this.illnessForm,
            relativeList: this.relatives,
          });
          
          
        }
        );
        


    this.initItemRows();
  }

  private generateDatumFormGroup(datum: any) {
    return this.fb.group({
      code: this.fb.control({ value: datum.code, disabled: false }),
      illName: this.fb.control({ value: datum.illName, disabled: false }),
      name: this.fb.control({ value: datum.name, disabled: false }),
      illNameOther:this.fb.control({ value: datum.illNameOther, disabled: false }),
      age_detected: this.fb.control({
        value: datum.age_detected,
        disabled: false,
      }),
    });
  }


  

  get itemRows() {
    return this.addmore.controls['itemRows'] as FormArray;
  }


  initItemRows(): FormGroup {
    return this.fb.group({
      code: null,
      illName: null,
      illNameOther:null,
      name: null,
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

  private generateDatumRelativeFormGroup(datum: any) {
    return this.fb.group({
      name: this.fb.control({ value: datum.name, disabled: false }),
      gender: this.fb.control({ value: datum.gender, disabled: false }),
      idCard: this.fb.control({ value: datum.idCard, disabled: false }),
      age: this.fb.control({ value: datum.age, disabled: false }),
      relation: this.fb.control({ value: datum.relation, disabled: false }),
      familyOrder: this.fb.control({
        value: datum.familyOrder,
        disabled: false,
      }),
      familyOrderOther: this.fb.control({
        value: datum.familyOrderOther,
        disabled: false,
      }),
      isDead: this.fb.control({ value: datum.isDead, disabled: false }),
      dead_age: this.fb.control({ value: datum.dead_age, disabled: false }),
      deathCause: this.fb.control({ value: datum.deathCause, disabled: false }),
      illnessRelative: this.fb.array(datum.illnessRelative.map((data : any)=>this.generateDatumFormGroup(data))) 
    });
  }

  newRelative(): FormGroup {
    
    return this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      idCard: [null],
      relation: ['', Validators.required],
      age: null,
      familyOrder: null,
      familyOrderOther: null,
      isDead: null,
      dead_age: null,
      deathCause: null,
      illnessRelative: this.fb.array([this.newIllNess()]),
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
      [
        'Vợ',
        'Mẹ',
        'Cô',
        'Dì',
        'Bà nội',
        'Bà ngoại',
        'Chị ruột',
        'Chị/em họ',
      ].indexOf(value) !== -1
    ) {
      this.relatives.value[relativeIndex].gender = 'Nữ';
    } else if (
      [
        'Cha',
        'Chồng',
        'Cậu',
        'Chú',
        'Anh ruột',
        'Ông nội',
        'Ông ngoại',
        'Anh/em họ',
      ].indexOf(value) !== -1
    ) {
      this.relatives.value[relativeIndex].gender = 'Nam';
    }
  }

  selectIllNess(value: string, illNessIndex: number) {
    if (value == 'Ung thư vú') this.itemRows.value[illNessIndex].name = 'BC1';
    if (value == 'Ung thư tuyến giáp')
      this.itemRows.value[illNessIndex].name = 'TC';
    if (value == 'Ung thư máu') this.itemRows.value[illNessIndex].name = 'BC2';
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
    if (value == 'Đau thắt ngực') this.itemRows.value[illNessIndex].name = 'AP';
    if (value == 'Rối loạn tâm thần')
      this.itemRows.value[illNessIndex].name = 'P';
    if (value == 'Động kinh') this.itemRows.value[illNessIndex].name = 'E';
    if (value == 'Rối loạn tăng động giảm chú ý')
      this.itemRows.value[illNessIndex].name = 'ADHD';
    if (value == 'Tự kỷ') this.itemRows.value[illNessIndex].name = 'A1';
    if (value == 'Hen') this.itemRows.value[illNessIndex].name = 'A2';
    if (value == 'Loãng xương') this.itemRows.value[illNessIndex].name = 'O';
    if (value == 'Đái tháo đường MODY')
      this.itemRows.value[illNessIndex].name = 'MODY';
    if (value == 'Khác') this.itemRows.value[illNessIndex].name = 'OT';
  }

   illNessList(empIndex: number): FormArray {
    
    return this.relatives.at(empIndex).get("illnessRelative") as FormArray;
  }

  newIllNess(): FormGroup {
    return this.fb.group({
      code: [null],
      illName: [''],
      illNameOther:null,
      name: null,
      age_detected: [null],
    });
  }

  selectIllNessRelative(
    value: string,
    relativeIndex: number,
    illNessIndex: number
  ) {
    if (value == 'Ung thư vú')
      this.illNessList(relativeIndex).value[illNessIndex].name = 'BC1';
    if (value == 'Ung thư tuyến giáp')
      this.illNessList(relativeIndex).value[illNessIndex].name = 'TC';
    if (value == 'Ung thư máu')
      this.illNessList(relativeIndex).value[illNessIndex].name = 'BC2';
    if (value == 'Ung thư tử cung')
      this.illNessList(relativeIndex).value[illNessIndex].name = 'UC';
    if (value == 'Ung thư dạ dày')
      this.illNessList(relativeIndex).value[illNessIndex].name = 'SC1';
    if (value == 'Ung thư đại trực tràng')
      this.illNessList(relativeIndex).value[illNessIndex].name = 'CC';
    if (value == 'Rối loạn đông máu')
      this.illNessList(relativeIndex).value[illNessIndex].name = 'BCD';
    if (value == 'Huyết khối tĩnh mạch sâu')
      this.illNessList(relativeIndex).value[illNessIndex].name = 'DVT';
    if (value == 'Thuyên tắc phổi')
      this.illNessList(relativeIndex).value[illNessIndex].name = 'PE';
    if (value == 'Bệnh tăng cholesterol máu gia đình')
      this.illNessList(relativeIndex).value[illNessIndex].name = 'FH';
    if (value == 'Nhồi máu cơ tim')
      this.illNessList(relativeIndex).value[illNessIndex].name = 'MI';
    if (value == 'Rối loạn nhịp')
      this.illNessList(relativeIndex).value[illNessIndex].name = 'CA2';
    if (value == 'Bệnh cơ tim giãn')
      this.illNessList(relativeIndex).value[illNessIndex].name = 'DCM';
    if (value == 'Đau thắt ngực')
      this.illNessList(relativeIndex).value[illNessIndex].name = 'AP';
    if (value == 'Rối loạn tâm thần')
      this.illNessList(relativeIndex).value[illNessIndex].name = 'P';
    if (value == 'Động kinh')
      this.illNessList(relativeIndex).value[illNessIndex].name = 'E';
    if (value == 'Rối loạn tăng động giảm chú ý')
      this.illNessList(relativeIndex).value[illNessIndex].name = 'ADHD';
    if (value == 'Tự kỷ')
      this.illNessList(relativeIndex).value[illNessIndex].name = 'A1';
    if (value == 'Hen')
      this.illNessList(relativeIndex).value[illNessIndex].name = 'A2';
    if (value == 'Loãng xương')
      this.illNessList(relativeIndex).value[illNessIndex].name = 'O';
    if (value == 'Đái tháo đường MODY')
      this.illNessList(relativeIndex).value[illNessIndex].name = 'MODY';
    if (value == 'Khác')
      this.illNessList(relativeIndex).value[illNessIndex].name = 'OT';
  }

  addNewRowIllRelative(relativeIndex: number) {
    this.illNessList(relativeIndex).push(this.newIllNess());
  }

  deleteRowIllRelative(empIndex: number, illNessIndex: number) {
    this.illNessList(empIndex).removeAt(illNessIndex);
  }

  updatePerson() {
    console.log(this.personForm.value);
    console.log(this.personList);
    if (this.personForm.valid) {
      this.api.updatePerson(this.personForm.value, this.username).subscribe({
        next: (res) => {
          sessionStorage.setItem('idUser', res.id.toString());
          this.api
            .convertGenogram(this.username)
            .subscribe();
          alert('Person added successfully');
        },
        error: () => {
          alert('Error');
        },
      });
    } else {
      alert('Hãy Điền Đầy Đủ Thông Tin Cần Thiết');
    }
  }
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    this.router.navigateByUrl('/login');
  }

  public disclaimer() {
    const dialogRef = this.dialog.open(DisclaimerComponent);
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
