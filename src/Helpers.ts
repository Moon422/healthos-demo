import { User } from "./App";
import { Order } from "./components/dashboard/AdminDashboard";
import { CartItem, Product } from "./components/dashboard/UserDashboard";

export const HOST_URL = "https://6av79h.deta.dev";

export async function verifyUser(token: string, callback: (u: User) => void) {
    const response = await fetch(`${HOST_URL}/verify`, {
        headers: {
            "authorization": `Bearer ${token}`
        },
        method: "GET"
    });

    if (response.ok) {
        const payload = await response.json();

        const user: User = {
            firstName: payload.firstName,
            lastName: payload.lastName,
            userType: payload.userType,
            phoneNumber: payload.phoneNumber,
            token
        };
        callback(user);
    } else {
        alert("Token not verfied");
    }
}

export async function loadProducts(token: string): Promise<Product[]> {
    const url = `${HOST_URL}/products`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.ok) {
        const products = await response.json();

        if (products) {
            return products;
        }
    }

    throw new Error("Error loading products");
}

export async function placeOrder(user: User, items: CartItem[]) {
    const url = `${HOST_URL}/orders`;
    console.log(JSON.stringify(items.map(i => i.product)));

    var response = await fetch(url, {
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${user.token}`
        },
        method: "POST",
        body: JSON.stringify(items.map(i => ({ productId: i.product.id, quantity: i.quanity })))
    });

    if (!response.ok) {
        throw new Error("Something went wrong");
    }

    console.log(await response.json());
}

export async function updateProduct(user: User, product: Product) {
    const url = `${HOST_URL}/products/${product.id}`;

    const response = await fetch(url, {
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${user.token}`,
        },
        method: "PATCH",
        body: JSON.stringify(product)
    });

    if (response.ok) {
        return await response.json();
    }

    throw new Error("Error updating product");
}

export async function addNewProduct(user: User, product: Product): Promise<Product> {
    const url = `${HOST_URL}/products`;

    const response = await fetch(url, {
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${user.token}`,
        },
        method: "POST",
        body: JSON.stringify(product)
    });

    if (response.ok) {
        const newProd = await response.json();
        return newProd;
    }

    throw new Error("Error creating product");
}

export async function getCustomers(user: User): Promise<User[]> {
    const url = `${HOST_URL}/customers`;
    const headers = {
        "authorization": `Bearer ${user.token}`
    };

    const response = await fetch(url, {
        method: "GET",
        headers,
    });

    if (response.ok) {
        return await response.json();
    }

    throw new Error("Error loading customers");
}

export async function getOrders(user: User): Promise<Order[]> {
    const url = `${HOST_URL}/orders`;
    const response = await fetch(url, {
        headers: {
            "authorization": `Bearer ${user.token}`
        },
        method: "GET"
    });

    if (response.ok) {
        return await response.json();
    }

    throw new Error("Error loading order list");
}
