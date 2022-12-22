import { User } from "./App";

export const HOST_URL = "http://localhost:8000";

export async function verifyUser(token: string, callback: (u: User) => void) {
    console.log(token);

    const response = await fetch(`${HOST_URL}/verify`, {
        headers: {
            "authorization": `Bearer ${token}`
        },
        method: "GET"
    });

    if (response.ok) {
        const user: User = {
            ...(await response.json()),
            token
        };
        callback(user);
    } else {
        alert("Token not verfied");
    }
}
