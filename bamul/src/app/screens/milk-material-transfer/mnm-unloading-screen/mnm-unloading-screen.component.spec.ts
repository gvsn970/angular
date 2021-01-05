import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnmUnloadingScreenComponent } from './mnm-unloading-screen.component';

describe('MnmUnloadingScreenComponent', () => {
  let component: MnmUnloadingScreenComponent;
  let fixture: ComponentFixture<MnmUnloadingScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnmUnloadingScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnmUnloadingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
