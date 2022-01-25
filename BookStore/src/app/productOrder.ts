import { Order } from "./Order";
import { Order2 } from "./order2";
import { Product } from "./product";
export interface ProductOrder{
order: Order2;
product: Product;
amount: number;
}
