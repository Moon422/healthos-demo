export class User {
    public firstName: string = "";
    public lastName: string = "";
    public userType: UserTypes = UserTypes.NORMAL;
    public phoneNumber?: string = "";
    public token: string = "";
}

export enum MenuItems {
    PRODUCTS, CART, HOME, CUSTOMERS, ORDERS
}

export enum UserTypes {
    NORMAL = "normal",
    ADMIN = "admin"
}

export type NavMenuItems = {
    text: string,
    itemType: MenuItems
}
