import { Component, FormEvent, MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { MenuItems, Order, Product, User } from "../../utils/Types";
import { NavBar } from "../shared/NavBar";
import { CustomerView } from "./CustomerView";
import { OrderView } from "./OrderView";
import { ProductView } from "./ProductView";

export class AdminDashboard extends Component<{ activeUser: User, logoutCallback: () => void }, { currentView: MenuItems }> {
    state: { currentView: MenuItems } = {
        currentView: MenuItems.HOME
    };

    currentViewChangedTo(item: MenuItems): void {
        this.setState({
            currentView: item
        });
    }

    render(): ReactNode {
        const menuItems = [
            { text: "Home", itemType: MenuItems.HOME },
            { text: "Customers", itemType: MenuItems.CUSTOMERS },
            { text: "Orders", itemType: MenuItems.ORDERS },
            { text: "Products", itemType: MenuItems.PRODUCTS },
        ];

        let mainContent: JSX.Element | undefined = undefined;

        switch (this.state.currentView) {
            case MenuItems.CUSTOMERS:
                mainContent = <CustomerView activeUser={this.props.activeUser} />
                break;
            case MenuItems.ORDERS:
                mainContent = <OrderView activeUser={this.props.activeUser} />
                break;
            case MenuItems.PRODUCTS:
                mainContent = <ProductView activeUser={this.props.activeUser} />
                break;
            default:
                mainContent = <h1>Home</h1>
                break;
        }

        return (
            <div>
                <NavBar activeUser={this.props.activeUser} title="HealthOS Admin" menuItems={menuItems} selectedItem={this.state.currentView} selectedItemChanged={item => this.currentViewChangedTo(item)} logoutCallback={() => this.props.logoutCallback()} />
                <div className="container mx-auto">
                    {mainContent}
                </div>
            </div>
        )
    }
}
