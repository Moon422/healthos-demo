import { Component, FormEvent, ReactNode } from "react";
import { loadProducts } from "../../utils/Helpers";
import { Product, CartItem, User } from "../../utils/Types";

class ProductDetailsView extends Component<{ product: Product, backBtnCallback: () => void, onProductAddToCart: (item: CartItem) => void }> {
    onBackClicked(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        e.preventDefault();
        this.props.backBtnCallback();
    }

    onFormSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        const formdata = new FormData(e.currentTarget);

        const quantity = parseInt(formdata.get("quantity") as string);
        if (isNaN(quantity) || quantity <= 0) {
            return;
        }

        this.props.onProductAddToCart({
            product: this.props.product,
            quantity: quantity
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
    onItemClicked(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
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

export class ProductList extends Component<{ user: User, onProductAddToCart: (item: CartItem) => void }, { products: Product[], selectedProduct?: Product }> {
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
