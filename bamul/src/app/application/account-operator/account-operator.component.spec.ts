import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOperatorComponent } from './account-operator.component';

describe('AccountOperatorComponent', () => {
  let component: AccountOperatorComponent;
  let fixture: ComponentFixture<AccountOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
