import { TestBed, async, inject } from '@angular/core/testing';

import { PersonalCredentialsGuard } from './personal-credentials.guard';

describe('PersonalCredentialsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonalCredentialsGuard]
    });
  });

  it('should ...', inject([PersonalCredentialsGuard], (guard: PersonalCredentialsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
