import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIndentComponent } from './list-indent.component';

describe('ListIndentComponent', () => {
  let component: ListIndentComponent;
  let fixture: ComponentFixture<ListIndentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListIndentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
