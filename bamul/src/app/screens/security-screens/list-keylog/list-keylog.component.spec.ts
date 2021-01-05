import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListKeylogComponent } from './list-keylog.component';

describe('ListKeylogComponent', () => {
  let component: ListKeylogComponent;
  let fixture: ComponentFixture<ListKeylogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListKeylogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListKeylogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
