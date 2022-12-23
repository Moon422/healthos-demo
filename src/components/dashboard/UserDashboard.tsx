import { Component, ReactNode, MouseEvent as ReactMouseEvent } from "react";
import { JsxElement } from "typescript";
import { User } from "../../App";
import { loadProducts } from "../../Helpers";

enum MenuItems {
    PRODUCTS, CART
}

class UserNav extends Component<{ user: User, logoutCallback: () => void, selectedItem: MenuItems, selectedItemChanged: (item: MenuItems) => void }> {
    onLogoutBtnClicked(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>): void {
        e.preventDefault();
        this.props.logoutCallback();
    }

    onMenuItemClicked(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>, menuItem: MenuItems): void {
        e.preventDefault();
        console.log("clicked");
        this.props.selectedItemChanged(menuItem);
    }

    render(): ReactNode {
        const menuItems = [
            { text: "Products", itemType: MenuItems.PRODUCTS },
            { text: "Cart", itemType: MenuItems.CART }
        ];

        const menuItemElements = menuItems.map((item, idx) => (
            <button onClick={e => this.onMenuItemClicked(e, item.itemType)} key={idx}
                className={`hover:cursor-pointer hover:font-bold ${item.itemType === this.props.selectedItem ? "menu-item-active" : ""}`}>
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

class ProductList extends Component<{ user: User }> {
    async loadProducts(view: MenuItems) {
        if (view === MenuItems.PRODUCTS) {
            try {
                const products = await loadProducts(this.props.user.token);

                if (products) {

                }
            } catch {
                alert("Loading products");
            }
        }
    }

    render(): ReactNode {
        return (
            <h1>Product list</h1>
        )
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


    onSelectedItemChanged(item: MenuItems): void {
        this.setState({
            currentView: item
        });
    }

    render(): ReactNode {
        let mainContent: JSX.Element | undefined = undefined;

        switch (this.state.currentView) {
            case MenuItems.PRODUCTS:
                mainContent = <ProductList user={this.props.user} />
                break;

            default:
                mainContent = <h1>Cart</h1>;
                break;
        }

        return (
            <>
                <UserNav selectedItemChanged={(item) => this.onSelectedItemChanged(item)} selectedItem={this.state.currentView} user={this.props.user} logoutCallback={() => this.props.logoutCallback()} />
                <div className="container mx-auto">
                    {mainContent}
                </div>
            </>
        );
    }
}
