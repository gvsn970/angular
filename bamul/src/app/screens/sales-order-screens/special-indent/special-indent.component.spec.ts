import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialIndentComponent } from './special-indent.component';

describe('SpecialIndentComponent', () => {
  let component: SpecialIndentComponent;
  let fixture: ComponentFixture<SpecialIndentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialIndentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
