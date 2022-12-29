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

        return (
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="w-3/12 text-center my-auto p-2 bg-slate-400 border-2 border-slate-700">Order Id</th>
                        <th className="w-4/12 text-center my-auto p-2 bg-slate-400 border-2 border-l-0 border-slate-700">Customer Name</th>
                        <th className="w-4/12 text-center my-auto p-2 bg-slate-400 border-2 border-l-0 border-slate-700">Product</th>
                        <th className="w-1/12 text-center my-auto p-2 bg-slate-400 border-2 border-l-0 border-slate-700">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.orders.map(
                            (order, orderIndex) => (
                                <tr>
                                    <td className="w-1/4 p-2 border-2 border-t-0 border-slate-700">
                                        {order.id}
                                    </td>
                                    <td className="w-4/12 text-center my-auto p-2 border-2 border-t-0 border-l-0 border-slate-700">
                                        {`${order.customer.firstName} ${order.customer.lastName}`}
                                    </td>
                                    <td className="border-2 border-t-0 border-l-0 border-slate-700" colSpan={2}>
                                        {
                                            order.items.map(
                                                (item, itemIndex) => (
                                                    <div className="flex">
                                                        <div className="w-4/5 text-center my-auto p-2">{item.product.name}</div>
                                                        <div className="w-1/5 text-center my-auto p-2">{item.quantity}</div>
                                                    </div>
                                                )
                                            )
                                        }
                                    </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        )
    }
}
