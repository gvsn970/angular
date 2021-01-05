import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportManagerComponent } from './transport-manager.component';

describe('TransportManagerComponent', () => {
  let component: TransportManagerComponent;
  let fixture: ComponentFixture<TransportManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
