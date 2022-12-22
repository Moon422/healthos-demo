import { User } from "./App";

export function verifyUser(token: string, callback: (u: User) => void) {
    fetch("http://localhost:8000/verify", {
        headers: {
            "authorization": `Bearer ${token}`
        },
        method: "GET"
    })
        .then(res => res.json())
        .then(res => {
            const user: User = {
                firstName: res.first_name,
                lastName: res.last_name,
                userType: res.user_type,
                token: token
            };

            callback(user);
        })
        .catch(err => console.log(err));
}
