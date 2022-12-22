import { Component, ReactNode } from "react";
import { Login } from "./Login";
import { Registration } from "./registration";

export class Auth extends Component {
    render(): ReactNode {
        return (
            <div className="container mx-auto">
                <div className="grid grid-cols-2">
                    <Login />
                    <Registration />
                </div>
            </div>
        );
    }
}
