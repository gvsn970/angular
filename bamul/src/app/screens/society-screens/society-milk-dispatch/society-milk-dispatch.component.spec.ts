import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyMilkDispatchComponent } from './society-milk-dispatch.component';

describe('SocietyMilkDispatchComponent', () => {
  let component: SocietyMilkDispatchComponent;
  let fixture: ComponentFixture<SocietyMilkDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocietyMilkDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyMilkDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
