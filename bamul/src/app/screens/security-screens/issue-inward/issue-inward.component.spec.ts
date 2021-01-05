import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueInwardComponent } from './issue-inward.component';

describe('IssueInwardComponent', () => {
  let component: IssueInwardComponent;
  let fixture: ComponentFixture<IssueInwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueInwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
