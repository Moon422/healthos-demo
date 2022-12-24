import { User } from "./App";
import { CartItem } from "./components/dashboard/UserDashboard";

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
            firstName: payload.first_name,
            lastName: payload.last_name,
            userType: payload.user_type,
            token
        };
        callback(user);
    } else {
        alert("Token not verfied");
    }
}

export async function loadProducts(token: string) {
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
