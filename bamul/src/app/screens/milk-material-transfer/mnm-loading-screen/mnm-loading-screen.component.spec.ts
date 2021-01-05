import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnmLoadingScreenComponent } from './mnm-loading-screen.component';

describe('MnmLoadingScreenComponent', () => {
  let component: MnmLoadingScreenComponent;
  let fixture: ComponentFixture<MnmLoadingScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnmLoadingScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnmLoadingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
