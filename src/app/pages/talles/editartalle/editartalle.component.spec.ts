import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditartalleComponent } from './editartalle.component';

describe('EditartalleComponent', () => {
  let component: EditartalleComponent;
  let fixture: ComponentFixture<EditartalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditartalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditartalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
