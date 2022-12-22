import { Component, ReactNode } from "react";
import "./style.css";

export class Login extends Component {
    render(): ReactNode {
        return (
            <form className="border-2 border-red-600">
                <label htmlFor="phone">Phone Number:</label><br />
                <input type="text" name="phone" id="phone" placeholder="(+88) 01xxxxxxxxx" /><br />
                <label htmlFor="password">Password:</label><br />
                <input type="password" name="password" id="password" placeholder="Password" /><br />
                <input type="submit" value="Login" id="login-btn" />
            </form>
        )
    }
}
