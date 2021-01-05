import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmcManagerComponent } from './bmc-manager.component';

describe('BmcManagerComponent', () => {
  let component: BmcManagerComponent;
  let fixture: ComponentFixture<BmcManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmcManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmcManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
