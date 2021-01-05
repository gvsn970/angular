import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmrdLabManagerComponent } from './rmrd-lab-manager.component';

describe('RmrdLabManagerComponent', () => {
  let component: RmrdLabManagerComponent;
  let fixture: ComponentFixture<RmrdLabManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmrdLabManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmrdLabManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
