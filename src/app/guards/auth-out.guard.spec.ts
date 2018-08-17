import { TestBed, async, inject } from '@angular/core/testing';

import { AuthOutGuard } from './auth-out.guard';

describe('AuthOutGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthOutGuard]
    });
  });

  it('should ...', inject([AuthOutGuard], (guard: AuthOutGuard) => {
    expect(guard).toBeTruthy();
  }));
});
