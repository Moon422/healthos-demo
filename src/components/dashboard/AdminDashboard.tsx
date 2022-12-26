import { Component, FormEvent, MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { User } from "../../App";
import { addNewProduct, getCustomers, getOrders, loadProducts, updateProduct } from "../../Helpers";
import { CartItem, Product } from "./UserDashboard";
import { Registration } from "../auth/registration";

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

class ProductView extends Component<{ activeUser: User, }, { products: Product[] }> {
    state: { products: Product[] } = {
        products: []
    };

    async componentDidMount(): Promise<void> {
        try {
            const response = await loadProducts(this.props.activeUser.token);

            if (response) {
                this.setState({
                    products: response
                });
            }
        } catch {
            alert("Error loading products");
        }
    }

    async onUpdateFormSubmit(e: FormEvent<HTMLFormElement>, prod: Product): Promise<void> {
        e.preventDefault();

        const products = this.state.products;
        const index = products.findIndex(p => p.id === prod.id);

        const formdata = new FormData(e.currentTarget);

        const updatedProd: Product = {
            id: prod.id,
            name: formdata.get("name") as string,
            description: formdata.get("desc") as string,
            quantity: parseInt(formdata.get("quantity") as string),
            price: parseInt(formdata.get("price") as string),
            image: prod.image
        };

        try {
            console.log(await updateProduct(this.props.activeUser, updatedProd));

            this.setState(prev => (
                {
                    products: [...prev.products.slice(0, index), updatedProd, ...prev.products.slice(index + 1)]
                }
            ));
        } catch {
            alert("Error updating product")
        }
    }

    deleteBtnClicked(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>, prod: Product): void {
        throw new Error("Method not implemented.");
    }

    async onAddFormSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        const formdata = new FormData(e.currentTarget);
        const product: Product = {
            name: formdata.get("name") as string,
            description: formdata.get("desc") as string,
            quantity: parseInt(formdata.get("quantity") as string),
            price: parseInt(formdata.get("price") as string),
        };

        try {
            const newProduct = await addNewProduct(this.props.activeUser, product);

            if (newProduct) {
                this.setState(prev => ({
                    products: [...prev.products, newProduct]
                }));
            }
        } catch {
            alert("Error createing product");
        }
    }

    render(): ReactNode {
        if (this.state.products.length <= 0) {
            return <p>Loading products...</p>
        }

        return (
            <div className="py-2">
                <div className="flex">
                    <div className="text-center my-auto p-2 bg-slate-400 border-2 border-slate-700 rounded-tl-lg w-full">Product Name</div>
                    <div className="text-center my-auto p-2 bg-slate-400 border-t-2 border-b-2 border-r-2 border-slate-700 w-full">Product Description</div>
                    <div className="text-center my-auto p-2 bg-slate-400 border-t-2 border-b-2 border-r-2 border-slate-700 w-full">Quantity</div>
                    <div className="text-center my-auto p-2 bg-slate-400 border-t-2 border-b-2 border-slate-700 w-full">Price</div>
                    <div className="text-center my-auto p-2 bg-slate-400 border-2 border-slate-700 rounded-tr-lg w-full">Action</div>
                </div>
                {this.state.products.map(
                    (prod, idx) => {
                        return (
                            <form onSubmit={e => this.onUpdateFormSubmit(e, prod)} className="flex pt-1" key={idx}>
                                <input className="rounded border-slate-300 border-2 p-1 w-1/5 max-h-10" type="text" name="name" id="name" defaultValue={prod.name} />
                                <textarea className="rounded border-slate-300 border-2 p-1 w-1/5" name="desc" id="desc" defaultValue={prod.description} />
                                <input className="rounded border-slate-300 border-2 p-1 w-1/5 max-h-10" type="number" name="quantity" id="quantity" defaultValue={prod.quantity} />
                                <input className="rounded border-slate-300 border-2 p-1 w-1/5 max-h-10" type="number" name="price" id="price" defaultValue={prod.price} />
                                <div className="flex w-1/5">
                                    <button type="submit" className="bg-sky-500 rounded p-1 font-bold cursor-pointer text-offwhite w-1/2 ml-1 hover:ring-2 max-h-10">Save</button>
                                    <button onClick={e => this.deleteBtnClicked(e, prod)} className="bg-red-500 rounded p-1 font-bold cursor-pointer text-offwhite w-1/2 ml-1 hover:ring-2 max-h-10">Delete</button>
                                </div>
                            </form>
                        )
                    }
                )}
                <h1>Add New Product</h1>
                <form className="flex pt-1" onSubmit={e => this.onAddFormSubmit(e)}>
                    <input className="rounded border-slate-300 border-2 p-1 w-1/5 max-h-10" type="text" name="name" id="name" placeholder="Name" />
                    <textarea className="rounded border-slate-300 border-2 p-1 w-1/5" name="desc" id="desc" placeholder="Description" />
                    <input className="rounded border-slate-300 border-2 p-1 w-1/5 max-h-10" type="number" name="quantity" id="quantity" placeholder="Quantity" />
                    <input className="rounded border-slate-300 border-2 p-1 w-1/5 max-h-10" type="number" name="price" id="price" placeholder="Price" />
                    <button type="submit" className="bg-sky-500 rounded p-1 font-bold cursor-pointer text-offwhite w-1/5 ml-1 hover:ring-2 max-h-10">Save</button>

                </form>
            </div>
        )
    }
}

class CustomerView extends Component<{ activeUser: User }, { customers: User[] }> {
    state: { customers: User[] } = {
        customers: []
    };

    async componentDidMount() {
        this.setState({
            customers: await getCustomers(this.props.activeUser)
        });
    }

    userCreated(u: any): void {
        this.setState(prev => ({
            customers: [...prev.customers, u]
        }));
    }

    render(): ReactNode {
        if (this.state.customers.length <= 0) {
            return <p>Customers loading...</p>
        }

        return (
            <>
                <div className="py-2 mx-auto">
                    <div className="flex">
                        <div className="w-2/6 text-center my-auto p-2 bg-slate-400 border-2 border-slate-700 rounded-tl-lg">First Name</div>
                        <div className="w-2/6 text-center my-auto p-2 bg-slate-400 border-2 border-l-0 border-slate-700">Last Name</div>
                        <div className="w-1/6 text-center my-auto p-2 bg-slate-400 border-2 border-l-0 border-slate-700">Phone Number</div>
                        <div className="w-1/6 text-center my-auto p-2 bg-slate-400 border-2 border-l-0 border-slate-700 rounded-tr-lg">Action</div>
                    </div>
                    {
                        this.state.customers.map((cust, idx) => {
                            console.log(cust);
                            return (
                                <form key={idx}>
                                    <input className="rounded border-slate-300 border-2 p-1 w-2/6 max-h-10" type="text" name="firstname" id="firstname" defaultValue={cust.firstName} />
                                    <input className="rounded border-slate-300 border-2 p-1 w-2/6 max-h-10" type="text" name="lastname" id="lastname" defaultValue={cust.lastName} />
                                    <input className="rounded border-slate-300 border-2 p-1 w-1/6 max-h-10" type="text" name="phonenumber" id="phonenumber" defaultValue={cust.phoneNumber} />
                                    <button className="bg-sky-500 rounded p-1 font-bold cursor-pointer text-offwhite w-1/6 hover:ring-2 max-h-10">Update</button>
                                </form>
                            );
                        })
                    }
                </div>
                <div className="py-2 mx-auto">
                    <h1>Add New Customer</h1>
                    <Registration onRegistrationSuccess={u => this.userCreated(u)} />
                </div>
            </>
        )
    }
}

export type Order = {
    id: string,
    customer: User,
    items: CartItem[]
};

class OrderView extends Component<{ activeUser: User }, { orders: Order[] }> {
    state: { orders: Order[] } = {
        orders: []
    };

    async componentDidMount(): Promise<void> {
        const orders = await getOrders(this.props.activeUser);
        console.log(orders);
        this.setState({
            orders: orders
        });
    }

    render(): ReactNode {
        if (this.state.orders.length <= 0) {
            return (
                <p>Loading Orders...</p>
            )
        }

        let orderElements: JSX.Element[] = [];

        this.state.orders.forEach((order, ord_index) => {
            orderElements.push(...order.items.map((item, item_index) => {
                return (
                    <div className="flex" key={ord_index * 10 + item_index}>
                        <div className="w-2/5">
                            {item.product.name}
                        </div>
                        <div className="w-2/5">
                            {`${order.customer.firstName} ${order.customer.lastName}`}
                        </div>
                        <div className="w-1/5">
                            {order.customer.phoneNumber}
                        </div>
                    </div>
                )
            }));
        })

        return (
            <div className="py-2 mx-auto">
                <div className="flex">
                    <div className="w-2/5 text-center my-auto p-2 bg-slate-400 border-2 border-slate-700 rounded-tl-lg">Product Name</div>
                    <div className="w-2/5 text-center my-auto p-2 bg-slate-400 border-2 border-l-0 border-slate-700">Customer Name</div>
                    <div className="w-1/5 text-center my-auto p-2 bg-slate-400 border-2 border-l-0 border-slate-700 rounded-tr-lg">Customer Phone Number</div>
                </div>
                {orderElements}
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
                <AdminNav activeUser={this.props.activeUser} logoutCallback={() => { }}
                    selectedItem={this.state.currentView} selectedItemChanged={item => this.currentViewChangedTo(item)} />
                <div className="container mx-auto">
                    {mainContent}
                </div>
            </div>
        )
    }
}
