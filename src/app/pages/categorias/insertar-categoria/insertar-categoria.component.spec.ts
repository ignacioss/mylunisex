import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarCategoriaComponent } from './insertar-categoria.component';

describe('InsertarCategoriaComponent', () => {
  let component: InsertarCategoriaComponent;
  let fixture: ComponentFixture<InsertarCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertarCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
