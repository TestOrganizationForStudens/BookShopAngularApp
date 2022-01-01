import { User } from "./user"; 
import { ProductOrder } from "./productOrder";

export interface Order {

id: number;
dateTime: Date;
userData: User;
price: number;
productOrderList: ProductOrder[];
}
