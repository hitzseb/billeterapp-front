import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Balance } from 'src/app/interfaces/balance';
import { Category } from 'src/app/interfaces/category';
import { Operation } from 'src/app/interfaces/operation';
import { AuthService } from 'src/app/services/authentication.service';
import { BalanceService } from 'src/app/services/balance.service';
import { CategoryService } from 'src/app/services/category.service';
import { OperationService } from 'src/app/services/operation.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent {

  constructor(private authService: AuthService,
              private router: Router,
              private balanceService: BalanceService,
              private categoryService: CategoryService,
              private operationService: OperationService) { }

  balance: Balance = {
    profits: 0,
    expenses: 0,
    total: 0
  }
  categories: Category[] = []
  operations: Operation[] = []
  transaction!: any;
  categoryId!: any;
  date!: any;
  form!: FormGroup;
  operation!: any;

  ngOnInit() {

    this.authService.isLoggedIn();

    this.getBalance();

    this.categoryService.getAllCategories().subscribe(res => {this.categories = res});

    this.getOperations();

    this.form = new FormGroup({
      description: new FormControl(),
      amount: new FormControl(),
      transaction: new FormControl(),
      categoryId: new FormControl(),
      date: new FormControl()
    });

  }

  resetForm() {
    this.form.reset();
  }

  getBalance() {
    this.balanceService.getBalance().subscribe(res => {this.balance = res});
  }

  getOperations() {
    this.transaction = (<HTMLInputElement>document.getElementById('transaction-filter')).value;
    this.categoryId = (<HTMLInputElement>document.getElementById('category-filter')).value;
    this.date = (<HTMLInputElement>document.getElementById('date-filter')).value;

    this.operationService.getAllOperations(this.transaction, this.categoryId, this.date)
      .subscribe(res => {this.operations = res});
  }

  saveOperation() {
    const operation = {
      description: this.form.get('description')?.value,
      amount: this.form.get('amount')?.value,
      transaction: this.form.get('transaction')?.value,
      categoryId: this.form.get('categoryId')?.value,
      date: this.form.get('date')?.value,
    };

    this.operationService.saveOperation(operation).subscribe(res => {
    this.operations.push(res.operation), 
    this.getBalance(),
    this.resetForm()
  });
  }

  editOperation(id: number) {
    const description: string | null = this.form.get('description')?.value;
    const amount: number | null = this.form.get('amount')?.value;
    const transaction: string | null = this.form.get('transaction')?.value;
    const categoryId: number | null = this.form.get('categoryId')?.value;
    const date: string | null = this.form.get('date')?.value;
    const index = this.operations.findIndex(op => op.id === id);
    this.operationService.editOperation(id, description, amount, transaction, categoryId, date)
      .subscribe(res => {this.operations[index] = res.operation, this.getBalance()});
  }

  deleteOperation(id: number) {
    const index = this.operations.findIndex(op => op.id === id);
    this.operationService.deleteOperation(id).subscribe(res => {
      this.operations.splice(index, 1), this.getBalance()});
  }

}

