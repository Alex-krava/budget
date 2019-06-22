import {Component, Inject, OnInit} from '@angular/core';
import { BudgetsService } from '../services/budgets.service';
import { IBudget } from '../interfaces/budgets.interface';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent implements OnInit {

  public modalFormOpen: boolean;

  constructor(private budgetsService: BudgetsService, @Inject('currencies') private currencies: string[]) { }

  public budgets: IBudget[] = [];

  private defaultBudget: IBudget = {
    id: 0,
    name: '',
    currency: (this.currencies.length) ? this.currencies[0] : '',
    limit: 1000,
    remaining: 1000,
    averageAmount: 0,
    maximumAmount: 0,
    minimumAmount: 0,
    transactions: []
  };

  ngOnInit() {
    this.budgetsService.load();
    this.budgets = this.budgetsService.getBudgets;
  }

  public createBudget(value: {name: string, currency: string, limit: number}): void {
    const budget = JSON.parse(JSON.stringify(this.defaultBudget));
    const budgets = this.budgetsService.getBudgets;
    const lastId = (budgets.length) ? budgets[budgets.length - 1].id : null;
    budget.name = value.name;
    budget.limit = value.limit.toFixed(2);
    budget.remaining = value.limit.toFixed(2);
    budget.currency = value.currency;
    budget.id = (budgets.length) ? lastId + 1 : 1;

    this.budgetsService.createBudget = budget;
  }

  public removeBudget(index: number) {
    this.budgetsService.removeBudget(index);
  }

  public resetBudget(index: number) {
    const budget = JSON.parse(JSON.stringify(this.defaultBudget));
    const budgets = JSON.parse(JSON.stringify(this.budgetsService.getBudgets));
    budget.id = budgets[index].id;
    budget.name = budgets[index].name;
    this.budgetsService.resetBudget(index, budget);
  }

  public openModal(): void {
    this.modalFormOpen = true;
  }

  public closeModal(): void {
    this.modalFormOpen = false;
  }
}
