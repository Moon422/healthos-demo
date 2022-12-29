import { Component, ReactNode, MouseEvent as ReactMouseEvent } from "react";
import { User, MenuItems, NavMenuItems } from "../../utils/Types";

export class NavBar extends Component<{ activeUser: User, title: string, menuItems: NavMenuItems[], logoutCallback: () => void, selectedItem: MenuItems, selectedItemChanged: (item: MenuItems) => void }> {
    onLogoutBtnClicked(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>): void {
        e.preventDefault();
        this.props.logoutCallback();
    }

    onMenuItemClicked(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>, menuItem: MenuItems): void {
        e.preventDefault();
        this.props.selectedItemChanged(menuItem);
    }

    render(): ReactNode {
        const menuItems = this.props.menuItems;

        const menuItemElements = menuItems.map((item, idx) => (
            <button onClick={e => this.onMenuItemClicked(e, item.itemType)} key={idx}
                className={`hover:cursor-pointer hover:font-bold ${item.itemType === this.props.selectedItem ? "menu-item-active" : ""}`}>
                {item.text}
            </button>
        ));

        return (
            <nav className="relative mx-auto p-6 bg-Limegreen py-12">
                <div className="flex item-center justify-between">
                    <div className="text-4xl">
                        {this.props.title}
                    </div>
                    <div className="flex space-x-6 text-slate-600">
                        {menuItemElements}
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
            </nav>
        );
    }
}
