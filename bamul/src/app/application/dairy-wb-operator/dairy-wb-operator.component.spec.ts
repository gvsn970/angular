import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DairyWbOperatorComponent } from './dairy-wb-operator.component';

describe('DairyWbOperatorComponent', () => {
  let component: DairyWbOperatorComponent;
  let fixture: ComponentFixture<DairyWbOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DairyWbOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DairyWbOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
