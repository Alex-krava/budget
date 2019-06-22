import { Injectable } from '@angular/core';
import { IBudget, ITransactions } from '../interfaces/budgets.interface';

@Injectable({
  providedIn: 'root'
})
export class BudgetsService {

  private budgetsList: IBudget[] = [];
  private storageName = 'budget';

  constructor() { }

  public get getBudgets(): IBudget[] {
    return this.budgetsList;
  }

  public set createBudget(budget: IBudget) {
    this.budgetsList.push(budget);
    this.save();
  }

  public removeBudget(index: number) {
    this.budgetsList.splice(index, 1);
    this.save();
  }

  public resetBudget(index: number, budget: IBudget) {
    this.budgetsList[index] = budget;
    this.save();
  }

  public addTransaction(id: number, transaction: ITransactions) {
    this.load();

    this.budgetsList.some((budgetParam, index) => {
      if (budgetParam.id === id) {
        this.budgetsList[index].transactions.push(transaction);
        return true;
      }
      return false;
    });

    this.save();
  }

  public removeTransaction(id: number, indexTransaction: number) {
    this.load();

    this.budgetsList.some((budgetParam, index) => {
      if (budgetParam.id === id) {
        this.budgetsList[index].transactions.splice(indexTransaction, 1);
        return true;
      }
      return false;
    });

    this.save();
  }

  public hasBudget(id: number): boolean {
    this.load();
    return this.budgetsList.some((budget) => budget.id === id);
  }

  public save() {
    const data = JSON.stringify(this.budgetsList);
    localStorage.setItem(this.storageName, data);
  }

  public load() {
    const data = localStorage.getItem(this.storageName);
    this.budgetsList = (data) ? JSON.parse(data) : [];
  }
}
