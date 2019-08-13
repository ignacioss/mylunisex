import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregartalleComponent } from './agregartalle.component';

describe('AgregartalleComponent', () => {
  let component: AgregartalleComponent;
  let fixture: ComponentFixture<AgregartalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregartalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregartalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
