import { Component, ReactNode } from "react";

export class Login extends Component {
    render(): ReactNode {
        return (
            <form>
                <label htmlFor="phone">Phone Number:</label><br />
                <input type="text" name="phone" id="phone" placeholder="(+88)01xxxxxxxxx" /><br />
                <label htmlFor="password">Password:</label><br />
                <input type="password" name="password" id="password" placeholder="Password" /><br />
                <input type="submit" value="Login" />
            </form>
        )
    }
}
