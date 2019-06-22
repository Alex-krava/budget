import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BudgetsService } from '../services/budgets.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetsGuard implements CanActivate {
  constructor(private budgetsService: BudgetsService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const id = +next.params.budgetsId;
    const hasBudget = this.budgetsService.hasBudget(id);
    if (!hasBudget) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
