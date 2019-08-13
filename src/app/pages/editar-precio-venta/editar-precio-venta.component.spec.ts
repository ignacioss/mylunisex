import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPrecioVentaComponent } from './editar-precio-venta.component';

describe('EditarPrecioVentaComponent', () => {
  let component: EditarPrecioVentaComponent;
  let fixture: ComponentFixture<EditarPrecioVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPrecioVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPrecioVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
