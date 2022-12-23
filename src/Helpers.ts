import { User } from "./App";

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
