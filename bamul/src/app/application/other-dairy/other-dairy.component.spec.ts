import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherDairyComponent } from './other-dairy.component';

describe('OtherDairyComponent', () => {
  let component: OtherDairyComponent;
  let fixture: ComponentFixture<OtherDairyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherDairyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherDairyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
