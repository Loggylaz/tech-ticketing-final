import { TestBed } from '@angular/core/testing';

import { InterventionResolver } from './intervention.resolver';

describe('InterventionResolver', () => {
  let resolver: InterventionResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(InterventionResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
