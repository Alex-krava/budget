import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Decimal } from 'decimal.js';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  private resource = 'https://api.ratesapi.io/api/latest';

  constructor(private http: HttpClient) { }

  public getExchangeData(baseRate) {
    return this.http.get(`${this.resource}?base=${baseRate}`);
  }

  public conversion(sum, rate): number {
    const sumD = new Decimal(sum);
    const rateD = new Decimal(rate);
    const result = +sumD.dividedBy(rateD);
    return result;
  }

  public transactionCounting(remainingProps: number, transactions: number[]) {
    const result = {
      remaining: remainingProps,
      average: 0,
      maximum: 0,
      minimum: 0
    };

    if (transactions.length) {
      const remaining = new Decimal(result.remaining);
      result.minimum = +Decimal.min(...transactions).toFixed(2);
      result.maximum = +Decimal.max(...transactions).toFixed(2);

      let sumTransactions = new Decimal(0);
      transactions.forEach((sum) => {
        sumTransactions = sumTransactions.plus(sum);
      });
      result.remaining = +remaining.minus(sumTransactions).toFixed(2);
      result.average = +sumTransactions.dividedBy(transactions.length).toFixed(2);
    }

    return result;
  }
}
