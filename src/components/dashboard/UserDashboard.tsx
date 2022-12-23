import { Component, ReactNode, MouseEvent as ReactMouseEvent } from "react";
import { User } from "../../App";

enum MenuItems {
    PRODUCTS, CART
}

class UserNav extends Component<{ user: User, logoutCallback: () => void }, { selectedMenu: MenuItems }> {
    state: { selectedMenu: MenuItems } = {
        selectedMenu: MenuItems.PRODUCTS
    }

    onLogoutBtnClicked(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>): void {
        e.preventDefault();
        this.props.logoutCallback();
    }

    onMenuItemClicked(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>, menuItem: MenuItems): void {
        e.preventDefault();
        console.log("clicked");
        this.setState({
            selectedMenu: menuItem
        });
    }

    render(): ReactNode {
        const menuItems = [
            { text: "Products", itemType: MenuItems.PRODUCTS },
            { text: "Cart", itemType: MenuItems.CART }
        ];

        const menuItemElements = menuItems.map((item, idx) => (
            <button onClick={e => this.onMenuItemClicked(e, item.itemType)} key={idx}
                className={`hover:cursor-pointer hover:font-bold ${item.itemType === this.state.selectedMenu ? "menu-item-active" : ""}`}>
                {item.text}
            </button>
        ));

        return (
            <nav className="relative mx-auto p-6 bg-Limegreen py-12">
                <div className="flex item-center justify-between">
                    <div className="text-4xl">HealthOS Demo</div>
                    <div className="flex space-x-6 text-slate-600">
                        {menuItemElements}
                    </div>
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
        );
    }
}

export class UserDashboard extends Component<{ user: User, logoutCallback: () => void }, { currentView: MenuItems }> {
    state: { currentView: MenuItems } = {
        currentView: MenuItems.PRODUCTS
    }

    onLogoutBtnClicked(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>): void {
        e.preventDefault();
        this.props.logoutCallback();
    }

    render(): ReactNode {
        return (
            <>
                <UserNav user={this.props.user} logoutCallback={() => this.props.logoutCallback()} />

            </>
        );
    }
}
