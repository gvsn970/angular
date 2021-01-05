import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkReceiveComponent } from './milk-receive.component';

describe('MilkReceiveComponent', () => {
  let component: MilkReceiveComponent;
  let fixture: ComponentFixture<MilkReceiveComponent>;

  beforeEach(async(() => { 
    TestBed.configureTestingModule({
      declarations: [ MilkReceiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
