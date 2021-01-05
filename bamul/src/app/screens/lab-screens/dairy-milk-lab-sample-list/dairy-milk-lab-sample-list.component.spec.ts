import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DairyMilkLabSampleListComponent } from './dairy-milk-lab-sample-list.component';

describe('DairyMilkLabSampleListComponent', () => {
  let component: DairyMilkLabSampleListComponent;
  let fixture: ComponentFixture<DairyMilkLabSampleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DairyMilkLabSampleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DairyMilkLabSampleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
