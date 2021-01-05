import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmcSuperUserComponent } from './bmc-super-user.component';

describe('BmcSuperUserComponent', () => {
  let component: BmcSuperUserComponent;
  let fixture: ComponentFixture<BmcSuperUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmcSuperUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmcSuperUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
