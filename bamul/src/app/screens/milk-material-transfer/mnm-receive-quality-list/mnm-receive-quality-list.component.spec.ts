import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnmReceiveQualityListComponent } from './mnm-receive-quality-list.component';

describe('MnmReceiveQualityListComponent', () => {
  let component: MnmReceiveQualityListComponent;
  let fixture: ComponentFixture<MnmReceiveQualityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnmReceiveQualityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnmReceiveQualityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
