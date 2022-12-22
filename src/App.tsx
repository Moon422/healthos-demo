import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Auth } from './components/auth/Auth';
import { verifyUser } from './Helpers';

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

const tokenKey: string = "healthostoken";

class App extends Component<{}, AppState> {
	state: AppState = {}

	componentDidMount() {
		const token = localStorage.getItem(tokenKey);
		if (token) {
			verifyUser(token, (u) => this.onTokenVeried(u));
		}
	}

	onTokenVeried(_user: User): void {
		// this.user = user;
		this.setState({
			user: _user
		});
		localStorage.setItem(tokenKey, _user.token);
	}

	render(): React.ReactNode {
		if (this.state.user) {
			return <h1>Logged in</h1>
		}
		return (
			<>
				<Auth onAuthSuccess={(u) => this.onTokenVeried(u)} />
			</>
		)
	}
}

export default App;
