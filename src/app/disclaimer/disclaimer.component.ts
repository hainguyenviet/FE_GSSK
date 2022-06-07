import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss']
})
export class DisclaimerComponent implements OnInit {

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<DisclaimerComponent>
  ) { }

  public formGroup!: FormGroup;

  ngOnInit(): void {
    this.formGroup = this._fb.group({
      check1: [false, Validators.requiredTrue],
      check2: [false, Validators.requiredTrue],
    });
  }

  confirm(){
  this.onclose();
  }

  onclose(){
    this.dialogRef.close();
  }
}