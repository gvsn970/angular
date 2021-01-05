import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiCalldeskComponent } from './ci-calldesk.component';

describe('CiCalldeskComponent', () => {
  let component: CiCalldeskComponent;
  let fixture: ComponentFixture<CiCalldeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiCalldeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiCalldeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
