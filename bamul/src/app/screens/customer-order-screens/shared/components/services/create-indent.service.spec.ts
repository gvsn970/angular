import { TestBed } from '@angular/core/testing';

import { CreateIndentService } from './create-indent.service';

describe('CreateIndentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateIndentService = TestBed.get(CreateIndentService);
    expect(service).toBeTruthy();
  });
});
