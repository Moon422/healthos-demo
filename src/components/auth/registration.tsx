import { Component, FormEvent, ReactNode } from "react";

import { HOST_URL, verifyUser } from "../../Helpers";
import { User } from "../../utils/Types";

type RegistrationProps = {
    onRegistrationSuccess: (u: User) => void;
}

export class Registration extends Component<RegistrationProps> {
    async onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        const formdata = new FormData(e.currentTarget);
        const body = {
            firstName: formdata.get("firstname"),
            lastName: formdata.get("lastname"),
            phoneNumber: formdata.get("rg-phone"),
            auth: {
                phone_number: formdata.get("rg-phone"),
                password: formdata.get("rg-password")
            }
        };

        const url = `${HOST_URL}/register`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            const token = (await response.json()).token;
            verifyUser(token, u => this.props.onRegistrationSuccess(u));
        } else {
            alert("Error while creating user");
        }
    }

    render(): ReactNode {
        return (
            <form onSubmit={(e) => this.onSubmit(e)}>
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
