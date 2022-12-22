import { User } from "./App";

export const HOST_URL = "http://localhost:8000";

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
