import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnmDispatchQualityListComponent } from './mnm-dispatch-quality-list.component';

describe('MnmDispatchQualityListComponent', () => {
  let component: MnmDispatchQualityListComponent;
  let fixture: ComponentFixture<MnmDispatchQualityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnmDispatchQualityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnmDispatchQualityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
