import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PandiIndentComponent } from './pandi-indent.component';

describe('PandiIndentComponent', () => {
  let component: PandiIndentComponent;
  let fixture: ComponentFixture<PandiIndentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PandiIndentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PandiIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
