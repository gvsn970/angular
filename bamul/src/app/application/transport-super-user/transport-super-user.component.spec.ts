import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportSuperUserComponent } from './transport-super-user.component';

describe('TransportSuperUserComponent', () => {
  let component: TransportSuperUserComponent;
  let fixture: ComponentFixture<TransportSuperUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportSuperUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportSuperUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
