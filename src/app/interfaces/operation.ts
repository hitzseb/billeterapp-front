import { Category } from "./category";

export interface Operation {
  id: number;
  description:string;
  amount: number;
  type: string;
  category: Category;
  date: string;
}
