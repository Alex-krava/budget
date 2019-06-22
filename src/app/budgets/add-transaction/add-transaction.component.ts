import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {

  public addTransactionForm: FormGroup;

  @Output() create: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(@Inject('currencies') public currencies: string[],
              private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.addTransactionForm = new FormGroup({
      target: new FormControl(),
      amount: new FormControl(),
      currency: new FormControl((this.currencies.length) ? this.currencies[0] : '')
    });

    this.addTransactionForm = this.fb.group({
      target: ['', Validators.required],
      amount: ['', Validators.required],
      currency: [(this.currencies.length) ? this.currencies[0] : '', Validators.required]
    });
  }

  public closeModal() {
    this.close.emit();
  }

  public addTransaction() {
    const transaction = this.addTransactionForm.value;
    transaction.amount = transaction.amount.toFixed(2);

    if (this.addTransactionForm.valid) {
      this.closeModal();
      this.create.emit(transaction);
    }
  }

}
