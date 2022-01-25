import { ProductOrder } from "./productOrder";
import { User } from "./user";



export interface Order2{
  dateTime: Date;
  price: number;
  productOrderList: ProductOrder[];
  }


