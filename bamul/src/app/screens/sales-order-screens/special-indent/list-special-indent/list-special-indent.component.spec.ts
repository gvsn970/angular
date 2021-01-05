import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSpecialIndentComponent } from './list-special-indent.component';

describe('ListSpecialIndentComponent', () => {
  let component: ListSpecialIndentComponent;
  let fixture: ComponentFixture<ListSpecialIndentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSpecialIndentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSpecialIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
