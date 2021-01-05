import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVisitorRegisterComponent } from './list-visitor-register.component';

describe('ListVisitorRegisterComponent', () => {
  let component: ListVisitorRegisterComponent;
  let fixture: ComponentFixture<ListVisitorRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVisitorRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVisitorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
