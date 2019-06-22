import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetsComponent, BudgetDetailsComponent } from './budgets';
import { BudgetsGuard } from './guards/budgets.guard';

const routes: Routes = [
  { path: '', redirectTo: 'budgets', pathMatch: 'full' },
  { path: 'budgets', component: BudgetsComponent },
  { path: 'budgets/:budgetsId', component: BudgetDetailsComponent, canActivate: [BudgetsGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
