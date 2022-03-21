import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
  constructor() { }

  ngOnInit(): void {
  }

  
}
