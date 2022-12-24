import { url } from "inspector";
import { Component, ReactNode, MouseEvent as ReactMouseEvent } from "react";
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

export type Product = {
    id: number,
    name: string,
    description: string,
    quantity: number,
    price: number,
    image: string
};

class ProductDetailsView extends Component<{ product: Product, backBtnCallback: () => void }> {
    onBackClicked(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>): void {
        e.preventDefault();
        this.props.backBtnCallback();
    }

    render(): ReactNode {
        return (
            <div>
                <button onClick={e => this.onBackClicked(e)} className="btn my-2">back</button>

                <div className="flex space-x-6">
                    <img src={this.props.product.image} alt="product image" className="rounded-xl" />
                    <div>
                        <h1>{this.props.product.name}</h1>
                        <p>{this.props.product.description}</p>
                        <p>Instock: {this.props.product.quantity}</p>
                        <p>Price: ${this.props.product.price}</p>
                        <form className="flex space-x-4 my-2">
                            <input type="number" name="quantity" id="quantity" className="rounded border-slate-300 border-2 p-1" placeholder="Quanity" />
                            <button type="submit" className="h-10 px-6 font-semibold rounded-md bg-black text-white hover:ring-4">Add to Cart</button>
                            <button className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900 hover:ring-4">Buy Now</button>
                        </form>
                    </div>
                </div>

            </div>
        )
    }
}


class ProductListItem extends Component<{ product: Product, clickCallback: (prod: Product) => void }> {
    onItemClicked(e: ReactMouseEvent<HTMLDivElement, MouseEvent>): void {
        e.preventDefault();
        this.props.clickCallback(this.props.product);
    }

    render(): ReactNode {
        return (
            <div className="bg-slate-400 hover:cursor-pointer rounded-2xl p-6 mt-4 bg-opacity-25 hover:shadow-2xl hover:bg-opacity-60"
                onClick={(e) => this.onItemClicked(e)}>
                <img src={this.props.product.image} alt="product picture" className="w-full rounded-xl" />
                <div>
                    <div className="text-4xl py-6 text-center">{this.props.product.name}</div>
                    <div className="truncate">{this.props.product.description}</div>
                    <div>Stock: {this.props.product.quantity}</div>
                    <div>Price: ${this.props.product.price}</div>
                </div>
            </div>
        )
    }
}

class ProductList extends Component<{ user: User }, { products: Product[], selectedProduct?: Product }> {
    state: { products: Product[], selectedProduct?: Product } = {
        products: []
    }

    async componentDidMount(): Promise<void> {
        await this.loadProducts();
    }

    async loadProducts() {
        try {
            const products = await loadProducts(this.props.user.token);

            if (products) {
                this.setState({
                    products: products
                });
            }
        } catch {
            alert("Loading products");

        }
    }

    showProductDetails(prod?: Product): void {
        this.setState({
            selectedProduct: prod
        });
    }

    render(): ReactNode {
        if (this.state.selectedProduct) {
            return <ProductDetailsView product={this.state.selectedProduct} backBtnCallback={() => this.showProductDetails(undefined)} />
        }

        return (
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {this.state.products.map((prod, idx) => {
                        return <ProductListItem key={idx} product={prod} clickCallback={prod => this.showProductDetails(prod)} />
                    })}
                </div>
            </div>
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
