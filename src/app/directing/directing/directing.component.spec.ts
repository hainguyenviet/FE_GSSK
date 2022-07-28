import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectingComponent } from './directing.component';

describe('DirectingComponent', () => {
  let component: DirectingComponent;
  let fixture: ComponentFixture<DirectingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
