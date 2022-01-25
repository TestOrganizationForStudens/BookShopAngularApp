import { User } from "./user"; 
import { ProductOrder } from "./productOrder";
import { User2 } from "./user2";

export interface Order {
id:number
dateTime: Date;
userData: User;
price: number;
productOrderList: ProductOrder[];
}
