import { Order } from "./Order";
import { Product } from "./product";
export interface ProductOrder{
id: number;
order: Order;
product: Product;
amount: number;
}
