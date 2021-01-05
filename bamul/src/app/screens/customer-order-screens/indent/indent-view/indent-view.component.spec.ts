import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentViewComponent } from './indent-view.component';

describe('IndentViewComponent', () => {
  let component: IndentViewComponent;
  let fixture: ComponentFixture<IndentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
