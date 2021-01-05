import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTempIndentComponent } from './update-temp-indent.component';

describe('UpdateTempIndentComponent', () => {
  let component: UpdateTempIndentComponent;
  let fixture: ComponentFixture<UpdateTempIndentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTempIndentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTempIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
