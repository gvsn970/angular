import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DairyMilkDetailSampleComponent } from './dairy-milk-detail-sample.component';

describe('DairyMilkDetailSampleComponent', () => {
  let component: DairyMilkDetailSampleComponent;
  let fixture: ComponentFixture<DairyMilkDetailSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DairyMilkDetailSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DairyMilkDetailSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
