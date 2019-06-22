import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-budget',
  templateUrl: './create-budget.component.html',
  styleUrls: ['./create-budget.component.scss']
})
export class CreateBudgetComponent implements OnInit {

  public createBudgetForm: FormGroup;

  @Output() create: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(@Inject('currencies') private currencies: string[],
              private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.createBudgetForm = new FormGroup({
      name: new FormControl(),
      limit: new FormControl(1000),
      currency: new FormControl((this.currencies.length) ? this.currencies[0] : '')
    });

    this.createBudgetForm = this.fb.group({
      name: ['', Validators.required],
      limit: [1000, Validators.required],
      currency: [(this.currencies.length) ? this.currencies[0] : '', Validators.required]
    });
  }

  public closeModal() {
    this.close.emit();
  }

  public createBudget() {
    if (this.createBudgetForm.valid) {
      this.closeModal();
      this.create.emit(this.createBudgetForm.value);
    }
  }
}
