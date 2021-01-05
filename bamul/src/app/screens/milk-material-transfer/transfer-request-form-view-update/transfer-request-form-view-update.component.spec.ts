import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferRequestFormViewUpdateComponent } from './transfer-request-form-view-update.component';

describe('TransferRequestFormViewUpdateComponent', () => {
  let component: TransferRequestFormViewUpdateComponent;
  let fixture: ComponentFixture<TransferRequestFormViewUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferRequestFormViewUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferRequestFormViewUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
