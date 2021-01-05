import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnmDispatchQualityComponent } from './mnm-dispatch-quality.component';

describe('MnmDispatchQualityComponent', () => {
  let component: MnmDispatchQualityComponent;
  let fixture: ComponentFixture<MnmDispatchQualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnmDispatchQualityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnmDispatchQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
