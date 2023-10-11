import { TestBed } from '@angular/core/testing';

import { InterventionListResolver } from './intervention-list.resolver';

describe('InterventionListResolver', () => {
  let resolver: InterventionListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(InterventionListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
