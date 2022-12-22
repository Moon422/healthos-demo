import { Component, ReactNode } from "react";

export class Login extends Component {
    render(): ReactNode {
        return (
            <form>
                <label htmlFor="phone">Phone Number:</label><br />
                <input type="text" name="phone" id="phone" placeholder="(+88) 01xxxxxxxxx" className="form-input mb-2" /><br />
                <label htmlFor="password">Password:</label><br />
                <input type="password" name="password" id="password" placeholder="Password" className="form-input mb-2" /><br />
                <input type="submit" value="Login" className="btn w-full" />
            </form>
        )
    }
}
