import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { BudgetsService } from '../../services/budgets.service';
import {IBudget, ITransactions} from '../../interfaces/budgets.interface';
import { ExchangeService } from '../../services/exchange.service';

@Component({
  selector: 'app-budget-details',
  templateUrl: './budget-details.component.html',
  styleUrls: ['./budget-details.component.scss']
})
export class BudgetDetailsComponent implements OnInit {

  private selectedId: number;
  public selectedBudget: IBudget;
  public modalFormOpen;
  public onLoadComponent;

  private indexSelectedBudget: number;
  private budgets: IBudget[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private budgetsService: BudgetsService,
              private exchangeService: ExchangeService) { }

  ngOnInit() {
    this.budgetsService.load();
    this.route.params.forEach((param) => {
      this.selectedId = +param.budgetsId;
    });

    this.init();
  }

  private init() {
    const hasBudget = this.budgetsService.hasBudget(this.selectedId);
    if (!hasBudget) {
      this.router.navigate(['/']);
    }
    this.budgets = this.budgetsService.getBudgets;
    this.indexSelectedBudget = this.getIndexSelectedBudget();
    this.selectedBudget = this.budgets[this.indexSelectedBudget];
    this.transactionProcessing();

    setInterval(() => this.transactionProcessing(), 30000);
  }

  public addTransaction(value: ITransactions): void {
    this.budgetsService.addTransaction(this.selectedId, value);
    this.selectedBudget.transactions.push(value);
    this.onLoadComponent = false;
    this.transactionProcessing();
  }
  public removeTransaction(index: number) {
    this.budgetsService.removeTransaction(this.selectedId, index);
    this.selectedBudget.transactions.splice(index, 1);
    this.onLoadComponent = false;
    this.transactionProcessing();
  }

  public openModal(): void {
    this.modalFormOpen = true;
  }

  public closeModal(): void {
    this.modalFormOpen = false;
  }

  public getIndexSelectedBudget(): number {
    let indexSelectedBudget = null;

    this.budgets.some((budgetParam, index) => {
      if (budgetParam.id === this.selectedId) {
        indexSelectedBudget = index;
        return true;
      }
      return false;
    });
    return indexSelectedBudget;
  }

  private transactionProcessing() {
    if (!this.selectedBudget) { return; }
    const transactionsList = this.selectedBudget.transactions;
    const baseRate = this.selectedBudget.currency;
    const transactionAmounts = [];

    this.exchangeService.getExchangeData(baseRate).subscribe((data: {base: string, date: string, rates: object}) => {
      transactionsList.forEach((transaction) => {
        const rate = transaction.currency;
        const sum = this.exchangeService.conversion(transaction.amount, data.rates[rate]);
        transactionAmounts.push(sum);
      });

      const newData = this.exchangeService.transactionCounting(this.selectedBudget.limit, transactionAmounts);
      this.updateBudgets(newData);
    });
  }

  private updateBudgets(data: {remaining: number, average: number, maximum: number, minimum: number}) {
    this.selectedBudget.remaining = data.remaining;
    this.selectedBudget.averageAmount = data.average;
    this.selectedBudget.maximumAmount = data.maximum;
    this.selectedBudget.minimumAmount = data.minimum;
    this.onLoadComponent = true;
  }
}
