import { Component, ReactNode } from "react";
import { getCustomers } from "../../utils/Helpers";
import { User } from "../../utils/Types";
import { Registration } from "../auth/Registration";

export class CustomerView extends Component<{ activeUser: User }, { customers: User[] }> {
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
