import { Component } from '@angular/core';
import {AuthService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import { Report } from 'src/app/interfaces/report';
import {ReportService} from "../../services/reports.service";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  constructor(private authService: AuthService, private router: Router, private reportService: ReportService) { }

  report: Report = {
    categoriesByExpense: [],
    categoriesByProfit: [],
    monthsByExpense: [],
    monthsByProfit: []
  };
  categoriesByProfit: any[] = [];
  categoriesByExpense: any[] = [];
  monthsByProfit: any[] = [];
  monthsByExpense: any[] = [];

  ngOnInit() {

    this.authService.isLoggedIn();

    this.reportService.getReports().subscribe(res => {
      this.report = res;
      this.categoriesByProfit = res.categoriesByProfit,
      this.categoriesByExpense = res.categoriesByExpense,
      this.monthsByProfit = res.monthsByProfit,
      this.monthsByExpense = res.monthsByExpense});
  }

  isReportEmpty(report: Report): boolean {
    return (
      !report ||
      (report.categoriesByExpense.length === 0 &&
        report.categoriesByProfit.length === 0 &&
        report.monthsByExpense.length === 0 &&
        report.monthsByProfit.length === 0)
    );
  }

}

