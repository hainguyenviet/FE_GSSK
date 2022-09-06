import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectConfirmComponent } from './direct-confirm.component';

describe('DirectConfirmComponent', () => {
  let component: DirectConfirmComponent;
  let fixture: ComponentFixture<DirectConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
