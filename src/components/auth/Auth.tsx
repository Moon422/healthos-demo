import { Component, ReactNode } from "react";
import { User } from "../../utils/Types";

import { Login } from "./Login";
import { Registration } from "./Registration";
// import "./style.css";

type AuthProps = {
    onAuthSuccess: (u: User) => void;
};

export class Auth extends Component<AuthProps> {
    render(): ReactNode {
        return (
            <>
                <h1 className="text-center bg-Limegreen bg-opacity-40 py-16">HealthOS Demo Login & Registration</h1>

                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-2 pr-4">
                            <h2>Login</h2>
                            <Login onLoginSucces={(u) => this.props.onAuthSuccess(u)} />
                        </div>
                        <div className="p-2 pl-4">
                            <h2>Create a New Account</h2>
                            <Registration onRegistrationSuccess={(u) => this.props.onAuthSuccess(u)} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
