import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferRequestFormComponent } from './transfer-request-form.component';

describe('TransferRequestFormComponent', () => {
  let component: TransferRequestFormComponent;
  let fixture: ComponentFixture<TransferRequestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferRequestFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
