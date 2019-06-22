import { TestBed, async, inject } from '@angular/core/testing';

import { BudgetsGuard } from './budgets.guard';

describe('BudgetsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BudgetsGuard]
    });
  });

  it('should ...', inject([BudgetsGuard], (guard: BudgetsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
