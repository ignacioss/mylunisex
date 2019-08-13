import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUltimaActualizacionComponent } from './ver-ultima-actualizacion.component';

describe('VerUltimaActualizacionComponent', () => {
  let component: VerUltimaActualizacionComponent;
  let fixture: ComponentFixture<VerUltimaActualizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerUltimaActualizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerUltimaActualizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
