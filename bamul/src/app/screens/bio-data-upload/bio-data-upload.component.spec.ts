import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BioDataUploadComponent } from './bio-data-upload.component';

describe('BioDataUploadComponent', () => {
  let component: BioDataUploadComponent;
  let fixture: ComponentFixture<BioDataUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BioDataUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BioDataUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
