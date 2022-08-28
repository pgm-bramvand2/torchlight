import { TestBed } from '@angular/core/testing';

import { CharacterGuardGuard } from './character-guard.guard';

describe('CharacterGuardGuard', () => {
  let guard: CharacterGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CharacterGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
