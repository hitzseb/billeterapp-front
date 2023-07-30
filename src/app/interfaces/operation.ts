import { Category } from "./category";

export interface Operation {
    id: number;
    description:string;
    amount: number;
    transaction: string;
    category: Category;
    date: string;
}
