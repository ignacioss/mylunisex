import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarstockComponent } from './actualizarstock.component';

describe('ActualizarstockComponent', () => {
  let component: ActualizarstockComponent;
  let fixture: ComponentFixture<ActualizarstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
