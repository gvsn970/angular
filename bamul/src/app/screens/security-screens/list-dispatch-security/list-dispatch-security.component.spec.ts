import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDispatchSecurityComponent } from './list-dispatch-security.component';

describe('ListDispatchSecurityComponent', () => {
  let component: ListDispatchSecurityComponent;
  let fixture: ComponentFixture<ListDispatchSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDispatchSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDispatchSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
