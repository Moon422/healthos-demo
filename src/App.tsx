import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Auth } from './components/auth/Auth';

enum UserTypes {
	NORMAL = "normal",
	ADMIN = "admin"
}

export class User {
	public firstName: string = "";
	public lastName: string = "";
	public userType: UserTypes = UserTypes.NORMAL;
	public token: string = "";
}

type AppState = {
	user?: User
};

class App extends Component<{}, AppState> {
	state: AppState = {}

	componentDidMount() {
		const token = localStorage.getItem("healhostoken");
		if (token) {

		}
	}

	onTokenVeried(_user: User): void {
		// this.user = user;
		this.setState({
			user: _user
		});
		console.log(localStorage);
		localStorage.setItem("healtostoken", _user.token);
	}

	render(): React.ReactNode {
		return (
			<>
				<Auth onAuthSuccess={(u) => this.onTokenVeried(u)} />
			</>
		)
	}
}

export default App;
