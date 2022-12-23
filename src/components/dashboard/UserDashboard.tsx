import { Component, ReactNode } from "react";
import { User } from "../../App";

export class UserDashboard extends Component<{ user: User }> {
    render(): ReactNode {
        return (
            <>
                <nav className="relative mx-auto p-6 bg-Limegreen py-12">
                    <div className="flex item-center justify-between">
                        <div className="text-4xl">HealthOS Demo</div>
                        <div className="flex space-x-6">
                            <div className="my-auto">
                                Logged in as {this.props.user.firstName + " " + this.props.user.lastName}
                            </div>
                            <button className="logout-btn">
                                Logout
                            </button>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}
