import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PAndIManagerComponent } from './p-and-i-manager.component';

describe('PAndIManagerComponent', () => {
  let component: PAndIManagerComponent;
  let fixture: ComponentFixture<PAndIManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PAndIManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PAndIManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
