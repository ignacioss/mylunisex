import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaTalleProductoComponent } from './alta-talle-producto.component';

describe('AltaTalleProductoComponent', () => {
  let component: AltaTalleProductoComponent;
  let fixture: ComponentFixture<AltaTalleProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaTalleProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaTalleProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
