import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IllnessService } from '../server_service/Illness/illness.service';
@Component({
  selector: 'app-illness',
  templateUrl: './illness.component.html',
  styleUrls: ['./illness.component.scss'],
})
export class IllnessComponent implements OnInit {
  selectedValue: string;
  constructor(
    private _fb: FormBuilder,
    private apiIll: IllnessService
  ) {
    this.selectedValue = '';
  }
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
  filteredOptions!: Observable<any[]>;
  public illnessForm !: FormGroup;
  public addmore!: FormGroup;

  ngOnInit() {
    this.addmore = this._fb.group({
      itemRows: this._fb.array([this.initItemRows()]),
    });
    this.illnessForm = this._fb.group({
      isTwin:['', Validators.required],
      isAdopted: ['', Validators.required],
      height:['', Validators.required],
      weight: ['', Validators.required],
      firstPeriodAge:['', Validators.required],
      birthControl: ['', Validators.required],
      pregnantTime: ['', Validators.required],
      firstBornAge:['', Validators.required],
      isSmoke: ['', Validators.required],
      smokeTime:['', Validators.required],
      giveUpSmokeAge:['', Validators.required],
      wineVolume:['', Validators.required],
      workOutVolume:['', Validators.required],
      workOutType:['', Validators.required],
      illGroup: this.itemRows,
    })
  }
  get itemRows() {
    return this.addmore.controls['itemRows'] as FormArray;
  }

  initItemRows() {
    return this._fb.group({
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

  testdata(){
    console.log(this.illnessForm.value)
  }

}
