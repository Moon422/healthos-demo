import { Component, ReactNode } from "react";
import { getOrders } from "../../utils/Helpers";
import { User, Order } from "../../utils/Types";

export class OrderView extends Component<{ activeUser: User }, { orders: Order[] }> {
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
