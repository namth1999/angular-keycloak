import { TestBed } from '@angular/core/testing';

import { SrpingbootBeService } from './srpingboot-be.service';

describe('SrpingbootBeService', () => {
  let service: SrpingbootBeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrpingbootBeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
