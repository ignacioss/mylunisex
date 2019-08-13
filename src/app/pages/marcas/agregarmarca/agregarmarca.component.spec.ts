import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarmarcaComponent } from './agregarmarca.component';

describe('AgregarmarcaComponent', () => {
  let component: AgregarmarcaComponent;
  let fixture: ComponentFixture<AgregarmarcaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarmarcaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarmarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
