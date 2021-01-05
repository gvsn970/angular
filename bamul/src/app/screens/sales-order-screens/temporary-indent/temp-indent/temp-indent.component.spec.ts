import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempIndentComponent } from './temp-indent.component';

describe('TempIndentComponent', () => {
  let component: TempIndentComponent;
  let fixture: ComponentFixture<TempIndentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempIndentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
