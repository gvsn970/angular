import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterIndentViewComponent } from './master-indent-view.component';

describe('MasterIndentViewComponent', () => {
  let component: MasterIndentViewComponent;
  let fixture: ComponentFixture<MasterIndentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterIndentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterIndentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
