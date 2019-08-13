import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TallesComponent } from './talles.component';

describe('TallesComponent', () => {
  let component: TallesComponent;
  let fixture: ComponentFixture<TallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
