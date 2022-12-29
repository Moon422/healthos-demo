import { Component, ReactNode } from "react";
import { placeOrder } from "../../utils/Helpers";
import { CartItem, User } from "../../utils/Types";

class CartItemView extends Component<{ cartItem: CartItem, removeItem: (item: CartItem) => void }> {
    onBtnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        e.preventDefault();
        this.props.removeItem(this.props.cartItem);
    }

    render(): ReactNode {
        return (
            <>
                <div className="col-span-8 border-2 border-t-0 border-slate-700 p-2">{this.props.cartItem.product.name}</div>
                <div className="bg-slate-600 p-2 text-right border-b-2 border-slate-700 text-white">{this.props.cartItem.quantity}</div>
                <div className="bg-slate-600 p-2 border-2 border-t-0 border-slate-700 text-white">
                    <button onClick={(e) => this.onBtnClick(e)} className="btn w-full">Remove</button>
                </div>
            </>
        )
    }
}

export class CartView extends Component<{ user: User, cartItems: CartItem[], removeItem: (item: CartItem) => void, clearCart: () => void }> {
    removeItem(item: CartItem): void {
        this.props.removeItem(item);
    }

    async onBtnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
        e.preventDefault();
        try {
            await placeOrder(this.props.user, this.props.cartItems);
            this.props.clearCart();
        } catch {
            alert("Order not placed. Please try again.")
        }
    }

    render(): ReactNode {
        return (
            <>
                <div className="grid grid-cols-10 my-2">
                    <div className="text-center my-auto p-2 col-span-8 bg-slate-400 border-2 border-slate-700 rounded-tl-lg">Name of Product</div>
                    <div className="text-center my-auto p-2 bg-slate-400 border-t-2 border-b-2 border-slate-700">Quantity</div>
                    <div className="text-center my-auto p-2 bg-slate-400 border-2 border-slate-700 rounded-tr-lg">Action</div>
                    {
                        this.props.cartItems.map((item, idx) => <CartItemView removeItem={item => this.removeItem(item)} key={idx} cartItem={item} />)
                    }
                </div>
                <div className="relative">
                    <button onClick={e => this.onBtnClick(e)} className="btn absolute right-0 w-1/4">Place Order</button>
                </div>
            </>
        );
    }
}
