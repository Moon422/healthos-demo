import { Component, MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { User } from "../../App";

enum MenuItems {
    HOME, CUSTOMERS, ORDERS, PRODUCTS
}

class AdminNav extends Component<{ activeUser: User, logoutCallback: () => void, selectedItem: MenuItems, selectedItemChanged: (item: MenuItems) => void }> {
    onLogoutBtnClicked(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>): void {
        e.preventDefault();
        this.props.logoutCallback();
    }

    onMenuItemClicked(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>, item: MenuItems): void {
        e.preventDefault();
        this.props.selectedItemChanged(item);
    }

    render(): ReactNode {
        const menuItems = [
            { text: "Home", itemType: MenuItems.HOME },
            { text: "Customers", itemType: MenuItems.CUSTOMERS },
            { text: "Orders", itemType: MenuItems.ORDERS },
            { text: "Products", itemType: MenuItems.PRODUCTS },
        ];

        const menuButtons = menuItems.map((item, idx) =>
            <button key={idx} onClick={e => this.onMenuItemClicked(e, item.itemType)}
                className={`hover:cursor-pointer hover:font-bold ${item.itemType === this.props.selectedItem ? "menu-item-active" : ""}`}>
                {item.text}
            </button>);

        return (
            <div className="flex items-center bg-Limegreen p-6 py-12 justify-between">
                <div className="text-4xl">HealthOS Admin</div>
                <div className="space-x-6">
                    {menuButtons}
                </div>
                <div className="flex space-x-6">
                    <div className="my-auto">
                        Logged in as {this.props.activeUser.firstName + " " + this.props.activeUser.lastName}
                    </div>
                    <button onClick={e => this.onLogoutBtnClicked(e)} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>
        )
    }
}

export class AdminDashboard extends Component<{ activeUser: User }, { currentView: MenuItems }> {
    state: { currentView: MenuItems } = {
        currentView: MenuItems.HOME
    };

    currentViewChangedTo(item: MenuItems): void {
        this.setState({
            currentView: item
        });
    }

    render(): ReactNode {
        let mainContent: JSX.Element | undefined = undefined;

        switch (this.state.currentView) {
            case MenuItems.CUSTOMERS:
                mainContent = <h1>CUSTOMERs</h1>
                break;
            case MenuItems.ORDERS:
                mainContent = <h1>ORDERS</h1>
                break;
            case MenuItems.PRODUCTS:
                mainContent = <h1>PRODUCTS</h1>
                break;
            default:
                mainContent = <h1>Home</h1>
                break;
        }

        return (
            <div>
                <AdminNav activeUser={this.props.activeUser} logoutCallback={() => { }}
                    selectedItem={this.state.currentView} selectedItemChanged={item => this.currentViewChangedTo(item)} />
                <div className="container mx-auto">
                    {mainContent}
                </div>
            </div>
        )
    }
}
