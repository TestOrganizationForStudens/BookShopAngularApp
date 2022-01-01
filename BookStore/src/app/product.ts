
import { ProductOrder } from "./productOrder";
export interface Product {
 id: number;
productName: string;
category: string;
author: string;
publishingHouse: string;
year: number;
price: number;
description: string;
image: string;
inStore: string;
productOrdersList: ProductOrder[];
}
