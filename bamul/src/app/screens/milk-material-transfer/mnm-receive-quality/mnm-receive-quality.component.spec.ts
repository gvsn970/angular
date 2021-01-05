import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnmReceiveQualityComponent } from './mnm-receive-quality.component';

describe('MnmReceiveQualityComponent', () => {
  let component: MnmReceiveQualityComponent;
  let fixture: ComponentFixture<MnmReceiveQualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnmReceiveQualityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnmReceiveQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
