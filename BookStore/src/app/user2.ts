import { ProductOrder } from "./productOrder";
import { UserRole } from "./userRole";

export interface User2 {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    address: string;
    phone: string;
    cardNumber: string;
    password: string;
    userRole: UserRole[] | null;
    listOfOrder: ProductOrder[] | null;
}

