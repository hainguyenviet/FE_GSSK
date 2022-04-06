import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HealthrecordsService } from '../server_service/HealthRecords/healthrecords.service';

@Component({
  selector: 'app-illness',
  templateUrl: './illness.component.html',
  styleUrls: ['./illness.component.scss'],
})
export class IllnessComponent implements OnInit {
  selectedValue: string;
  constructor(
    private _fb: FormBuilder,
    private healthrecordsService: HealthrecordsService
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

  public addmore!: FormGroup;

  ngOnInit() {
    this.addmore = this._fb.group({
      itemRows: this._fb.array([this.initItemRows()]),
    });
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
    //console.log(this.itemRows)
  }

  deleteRow(index: number) {
    this.itemRows.removeAt(index);
  }

  saveInforIllnessData(data: any) {
    this.healthrecordsService.saveInformation(data).subscribe((result) => {
      // show console value id
      /* console.log(result.id) */
      sessionStorage.setItem('id', result.id.toString());
    });
  }
}
