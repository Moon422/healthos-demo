import { Component, ReactNode, MouseEvent as ReactMouseEvent } from "react";
import { User } from "../../App";

export class UserDashboard extends Component<{ user: User, logoutCallback: () => void }> {
    onLogoutBtnClicked(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>): void {
        e.preventDefault();
        this.props.logoutCallback();
    }

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
                            <button onClick={e => this.onLogoutBtnClicked(e)} className="logout-btn">
                                Logout
                            </button>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}
