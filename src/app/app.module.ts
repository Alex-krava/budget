import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTransactionComponent, BudgetsComponent, CreateBudgetComponent, BudgetDetailsComponent } from './budgets';
import { BudgetsService } from './services/budgets.service';
import { ExchangeService } from './services/exchange.service';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BudgetsComponent,
    CreateBudgetComponent,
    BudgetDetailsComponent,
    AddTransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: 'currencies', useValue: environment.currencies},
    BudgetsService,
    ExchangeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
