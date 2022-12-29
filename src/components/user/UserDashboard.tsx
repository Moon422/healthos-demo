import { Component, ReactNode, MouseEvent as ReactMouseEvent, FormEvent } from "react";
import { NavBar } from "../shared/NavBar";
import { User, MenuItems, NavMenuItems, Product, CartItem } from "../../utils/Types";
import { ProductList } from "./ProductView";
import { CartView } from "./CartView";

export class UserDashboard extends Component<{ user: User, logoutCallback: () => void }, { currentView: MenuItems, cartItems: CartItem[] }> {
    state: { currentView: MenuItems, cartItems: CartItem[] } = {
        currentView: MenuItems.PRODUCTS,
        cartItems: []
    }


    onSelectedItemChanged(item: MenuItems): void {
        this.setState({
            currentView: item
        });
    }

    addItemToCart(item: CartItem) {
        const items = this.state.cartItems;

        const index = items.findIndex(cartItem => cartItem.product.id === item.product.id);
        if (index < 0) {
            this.setState(prev => ({
                cartItems: [...prev.cartItems, item]
            }));
        } else {
            item.quanity += items[index].quanity;

            this.setState({
                cartItems: [...items.slice(0, index), item, ...items.slice(index + 1)]
            });
        }
    }

    removeItemFromCart(item: CartItem): void {
        const items = this.state.cartItems;

        const index = items.findIndex(cartItem => cartItem.product.id === item.product.id);

        if (index >= 0) {
            this.setState({
                cartItems: [...items.slice(0, index), ...items.slice(index + 1)]
            });
        }
    }

    clearCart(): void {
        this.setState({
            cartItems: []
        });
    }

    render(): ReactNode {
        let mainContent: JSX.Element | undefined = undefined;

        const menuItems: NavMenuItems[] = [
            {
                text: "Products",
                itemType: MenuItems.PRODUCTS
            },
            {
                text: "Cart",
                itemType: MenuItems.CART
            }
        ];

        switch (this.state.currentView) {
            case MenuItems.PRODUCTS:
                mainContent = <ProductList user={this.props.user} onProductAddToCart={item => this.addItemToCart(item)} />
                break;

            default:
                mainContent = <CartView clearCart={() => this.clearCart()} user={this.props.user} removeItem={item => this.removeItemFromCart(item)} cartItems={this.state.cartItems} />;
                break;
        }

        return (
            <>
                <NavBar activeUser={this.props.user} menuItems={menuItems} selectedItem={this.state.currentView} logoutCallback={() => this.props.logoutCallback()} title="HealthOS Demo" selectedItemChanged={item => this.onSelectedItemChanged(item)} />
                <div className="container mx-auto">
                    {mainContent}
                </div>
            </>
        );
    }
}
