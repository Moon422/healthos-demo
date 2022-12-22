import { Component, ReactNode } from "react";

export class Registration extends Component {
    render(): ReactNode {
        return (
            <form>
                <div className="columns-2">
                    <label htmlFor="firstname">First Name:</label><br />
                    <input type="text" name="firstname" id="firstname" placeholder="First Name" className="form-input mb-2" /><br />

                    <label htmlFor="lastname">Last Name:</label><br />
                    <input type="text" name="lastname" id="lastname" placeholder="Last Name" className="form-input mb-2" /><br />
                </div>

                <label htmlFor="rg-phone">Phone Number:</label><br />
                <input type="text" name="rg-phone" id="rg-phone" placeholder="(+88) 01xxxxxxxxx" className="form-input mb-2" /><br />

                <label htmlFor="rg-password">Password:</label><br />
                <input type="password" name="rg-password" id="rg-password" placeholder="Password" className="form-input mb-2" /><br />

                <input type="submit" value="Register" className="btn w-full" />
            </form>
        )
    }
}
