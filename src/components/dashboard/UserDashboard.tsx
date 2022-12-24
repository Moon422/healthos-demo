import { url } from "inspector";
import { Component, ReactNode, MouseEvent as ReactMouseEvent, FormEvent } from "react";
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

class ProductDetailsView extends Component<{ product: Product, backBtnCallback: () => void, onProductAddToCart: (item: CartItem) => void }> {
    onBackClicked(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>): void {
        e.preventDefault();
        this.props.backBtnCallback();
    }

    onFormSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        const formdata = new FormData(e.currentTarget);

        const quanity = parseInt(formdata.get("quantity") as string);
        if (isNaN(quanity) || quanity <= 0) {
            return;
        }

        this.props.onProductAddToCart({
            product: this.props.product,
            quanity: quanity
        });
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
                        <form onSubmit={e => this.onFormSubmit(e)} className="flex space-x-4 my-2">
                            <input type="number" name="quantity" id="quantity" className="rounded border-slate-300 border-2 p-1" placeholder="Quanity" />
                            <button type="submit" className="h-10 px-6 font-semibold rounded-md bg-black text-white hover:ring-4">Add to Cart</button>
                            <button className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900 hover:ring-4 hidden">Buy Now</button>
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

class ProductList extends Component<{ user: User, onProductAddToCart: (item: CartItem) => void }, { products: Product[], selectedProduct?: Product }> {
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
            return <ProductDetailsView product={this.state.selectedProduct} backBtnCallback={() => this.showProductDetails(undefined)}
                onProductAddToCart={item => this.props.onProductAddToCart(item)} />
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

type CartItem = {
    product: Product,
    quanity: number
};

class CartItemView extends Component<{ cartItem: CartItem }> {
    render(): ReactNode {
        return (
            // <h1>{`${this.props.cartItem.product.name} ${this.props.cartItem.quanity}`}</h1>
            <>
                <div className="col-span-8 border-2 border-t-0 border-slate-700 p-2">{this.props.cartItem.product.name}</div>
                <div className="bg-slate-600 p-2 text-right border-b-2 border-slate-700 text-white">{this.props.cartItem.quanity}</div>
                <div className="bg-slate-600 p-2 border-2 border-t-0 border-slate-700 text-white"><button className="btn w-full">Remove</button></div>
            </>
        )
    }
}

class CartView extends Component<{ cartItems: CartItem[] }> {
    render(): ReactNode {
        return (
            <div className="grid grid-cols-10 my-2">
                <div className="text-center my-auto p-2 col-span-8 bg-slate-400 border-2 border-slate-700 rounded-tl-lg">Name of Product</div>
                <div className="text-center my-auto p-2 bg-slate-400 border-t-2 border-b-2 border-slate-700">Quantity</div>
                <div className="text-center my-auto p-2 bg-slate-400 border-2 border-slate-700 rounded-tr-lg">Action</div>
                {
                    this.props.cartItems.map((item, idx) => <CartItemView key={idx} cartItem={item} />)
                }
            </div>
        );
    }
}

export class UserDashboard extends Component<{ user: User, logoutCallback: () => void }, { currentView: MenuItems, cartItems: CartItem[] }> {
    state: { currentView: MenuItems, cartItems: CartItem[] } = {
        currentView: MenuItems.PRODUCTS,
        cartItems: []
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

    addItemToCart(item: CartItem) {
        this.setState(prevState => ({
            cartItems: [...prevState.cartItems, item]
        }));
    }

    render(): ReactNode {
        let mainContent: JSX.Element | undefined = undefined;

        switch (this.state.currentView) {
            case MenuItems.PRODUCTS:
                mainContent = <ProductList user={this.props.user} onProductAddToCart={item => this.addItemToCart(item)} />
                break;

            default:
                mainContent = <CartView cartItems={this.state.cartItems} />;
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
