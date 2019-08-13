import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTodosProductosComponent } from './listar-todos-productos.component';

describe('ListarTodosProductosComponent', () => {
  let component: ListarTodosProductosComponent;
  let fixture: ComponentFixture<ListarTodosProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarTodosProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTodosProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
