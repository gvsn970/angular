import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListKeylogRegisterComponent } from './list-keylog-register.component';

describe('ListKeylogRegisterComponent', () => {
  let component: ListKeylogRegisterComponent;
  let fixture: ComponentFixture<ListKeylogRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListKeylogRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListKeylogRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
