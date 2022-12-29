import { Component, FormEvent, ReactNode } from "react";
import { HOST_URL, verifyUser } from "../../utils/Helpers";
import { User } from "../../utils/Types";

type LoginProps = {
    onLoginSucces: (u: User) => void
};

export class Login extends Component<LoginProps> {

    async onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formdata = new FormData(e.currentTarget);
        const body = {
            phone_number: formdata.get("phone"),
            password: formdata.get("password")
        };

        const response = await fetch(`${HOST_URL}/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            const token = (await response.json()).token;
            verifyUser(token, u => this.props.onLoginSucces(u));
        } else if (response.status === 401) {
            alert("Invalid credentials. Please try again");
        }
    }

    render(): ReactNode {
        return (
            <form onSubmit={(e) => this.onSubmit(e)}>
                <label htmlFor="phone">Phone Number:</label><br />
                <input type="text" name="phone" id="phone" placeholder="(+88) 01xxxxxxxxx" className="form-input mb-2" /><br />
                <label htmlFor="password">Password:</label><br />
                <input type="password" name="password" id="password" placeholder="Password" className="form-input mb-2" /><br />
                <input type="submit" value="Login" className="btn w-full" />
            </form>
        )
    }
}
