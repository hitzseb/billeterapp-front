import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceComponent } from './components/balance/balance.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {CategoriesComponent} from "./components/categories/categories.component";
import {ReportsComponent} from "./components/reports/reports.component";

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'balance', component: BalanceComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'reports', component: ReportsComponent },
  { path: '', redirectTo: 'balance', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
