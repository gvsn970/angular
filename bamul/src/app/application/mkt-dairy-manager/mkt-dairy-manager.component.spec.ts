import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MktDairyManagerComponent } from './mkt-dairy-manager.component';

describe('MktDairyManagerComponent', () => {
  let component: MktDairyManagerComponent;
  let fixture: ComponentFixture<MktDairyManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MktDairyManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MktDairyManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
