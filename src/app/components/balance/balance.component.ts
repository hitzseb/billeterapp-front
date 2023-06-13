import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Balance } from 'src/app/interfaces/balance';
import { Category } from 'src/app/interfaces/category';
import { Operation } from 'src/app/interfaces/operation';
import { BalanceService } from 'src/app/services/balance.service';
import {AuthService} from "../../services/auth.service";
import {CategoryService} from "../../services/category.service";
import {OperationService} from "../../services/operation.service";
import { FormControl, FormGroup } from '@angular/forms';

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

  balance!: Balance;
  categories!: Category[]
  operations!: Operation[]
  type!: any;
  categoryId!: any;
  date!: any;
  form!: FormGroup;
  operation!: any;

  ngOnInit() {

    console.log(this.authService.isLoggedIn());
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    this.getBalance();

    this.categoryService.getAllCategories().subscribe(res => {this.categories = res, console.log(this.categories)});

    this.getOperations();

    this.form = new FormGroup({
      description: new FormControl(),
      amount: new FormControl(),
      type: new FormControl(),
      categoryId: new FormControl(),
      date: new FormControl()
    });

  }

  getBalance() {
    this.balanceService.getBalance().subscribe(res => {this.balance = res});
  }

  getOperations() {
    this.type = (<HTMLInputElement>document.getElementById('type-filter')).value;
    this.categoryId = (<HTMLInputElement>document.getElementById('category-filter')).value;
    this.date = (<HTMLInputElement>document.getElementById('date-filter')).value;

    console.log(this.type);
    console.log(this.categoryId);
    console.log(this.date);

    this.operationService.getAllOperations(this.type, this.categoryId, this.date)
      .subscribe(res => {this.operations = res});
  }

  saveOperation() {
    const operation = {
      description: this.form.get('description')?.value,
      amount: this.form.get('amount')?.value,
      type: this.form.get('type')?.value,
      categoryId: this.form.get('categoryId')?.value,
      date: this.form.get('date')?.value,
    };
    console.log(operation);
    this.operationService.saveOperation(operation).subscribe(res => {
      this.operations.push(res.operation), this.getBalance()});
  }

  editOperation(id: number) {
    const description: string | null = this.form.get('description')?.value;
    const amount: number | null = this.form.get('amount')?.value;
    const type: string | null = this.form.get('type')?.value;
    const categoryId: number | null = this.form.get('categoryId')?.value;
    const date: string | null = this.form.get('date')?.value;
    const index = this.operations.findIndex(op => op.id === id);
    this.operationService.editOperation(id, description, amount, type, categoryId, date)
      .subscribe(res => {this.operations[index] = res.operation});
  }

  deleteOperation(id: number) {
    const index = this.operations.findIndex(op => op.id === id);
    this.operationService.deleteOperation(id).subscribe(res => {
      this.operations.splice(index, 1)});
  }

}
