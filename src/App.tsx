import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Auth } from './components/auth/Auth';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { verifyUser } from './Helpers';
import { User, UserTypes } from './utils/Types';

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
		this.setState({
			user: _user
		});
		localStorage.setItem(tokenKey, _user.token);
	}

	logout(): void {
		localStorage.removeItem(tokenKey);
		this.setState({
			user: undefined
		});
	}

	render(): React.ReactNode {
		if (this.state.user) {
			if (this.state.user.userType === UserTypes.NORMAL) {
				return <UserDashboard user={this.state.user} logoutCallback={() => this.logout()} />
			} else {
				return <AdminDashboard activeUser={this.state.user} logoutCallback={() => this.logout()} />
			}
		}

		return (
			<>
				<Auth onAuthSuccess={(u) => this.onTokenVeried(u)} />
			</>
		)
	}
}

export default App;
