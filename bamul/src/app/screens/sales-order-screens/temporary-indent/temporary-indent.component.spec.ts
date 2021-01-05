import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporaryIndentComponent } from './temporary-indent.component';

describe('TemporaryIndentComponent', () => {
  let component: TemporaryIndentComponent;
  let fixture: ComponentFixture<TemporaryIndentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemporaryIndentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporaryIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
