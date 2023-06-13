import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Report} from "../../interfaces/report";
import {ReportService} from "../../services/report.service";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  constructor(private authService: AuthService, private router: Router, private reportService: ReportService) { }

  report!: Report;
  categoriesByProfit!: any[];
  categoriesByExpense!: any[];
  monthsByProfit!: any[];
  monthsByExpense!: any[];

  ngOnInit() {

    console.log(this.authService.isLoggedIn());
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    this.reportService.getReports().subscribe(res => {
      this.report = res;
      this.categoriesByProfit = res.categoriesByProfit,
      this.categoriesByExpense = res.categoriesByExpense,
      this.monthsByProfit = res.monthsByProfit,
      this.monthsByExpense = res.monthsByExpense});
  }

}
