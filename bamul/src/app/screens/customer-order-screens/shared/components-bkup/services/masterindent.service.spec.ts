import { TestBed } from '@angular/core/testing';

import { MasterindentService } from './masterindent.service';

describe('MasterindentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterindentService = TestBed.get(MasterindentService);
    expect(service).toBeTruthy();
  });
});
