import { UserRole } from "./userRole";
export interface Role {
    id:number;
    role: string;
    userRoles: UserRole[] | null;
}
