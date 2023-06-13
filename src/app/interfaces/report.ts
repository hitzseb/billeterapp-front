import {CategoryAmount} from "./category-amount";
import {MonthAmount} from "./month-amount";

export interface Report {
  categoriesByExpense: CategoryAmount[],
  categoriesByProfit: CategoryAmount[],
  monthsByExpense: MonthAmount[],
  monthsByProfit: MonthAmount[],
}
