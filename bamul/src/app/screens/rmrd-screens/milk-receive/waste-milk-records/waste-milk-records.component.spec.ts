import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteMilkRecordsComponent } from './waste-milk-records.component';

describe('WasteMilkRecordsComponent', () => {
  let component: WasteMilkRecordsComponent;
  let fixture: ComponentFixture<WasteMilkRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WasteMilkRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WasteMilkRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
