import { Component, FormEvent, ReactNode } from "react";
import { loadProducts, updateProduct, addNewProduct } from "../../utils/Helpers";
import { User, Product } from "../../utils/Types";

export class ProductView extends Component<{ activeUser: User, }, { products: Product[] }> {
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

    deleteBtnClicked(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, prod: Product): void {
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
