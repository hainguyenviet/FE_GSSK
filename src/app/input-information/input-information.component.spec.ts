import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputInformationComponent } from './input-information.component';

describe('InputInformationComponent', () => {
  let component: InputInformationComponent;
  let fixture: ComponentFixture<InputInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
