import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProductoGeneralComponent } from './editar-producto-general.component';

describe('EditarProductoGeneralComponent', () => {
  let component: EditarProductoGeneralComponent;
  let fixture: ComponentFixture<EditarProductoGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarProductoGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarProductoGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
