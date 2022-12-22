import { Component, FormEvent, ReactNode } from "react";
import { User } from "../../App";
import { verifyUser } from "../../Helpers";

type LoginProps = {
    onLoginSucces: (u: User) => void
};

export class Login extends Component<LoginProps> {

    onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formdata = new FormData(e.currentTarget);
        const body = JSON.stringify({
            phone_number: formdata.get("phone"),
            password: formdata.get("password")
        });

        fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: body
        })
            .then(res => res.json())
            .then(res => {
                const token = res.token;
                verifyUser(token, (u) => this.props.onLoginSucces(u));
            })
            .catch(err => console.log(err));
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
