import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenogramComponent } from "./genogram.component";

describe('GenogramComponent', () => {
  let component: GenogramComponent;
  let fixture: ComponentFixture<GenogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenogramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
