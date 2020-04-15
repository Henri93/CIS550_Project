import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Map from './Map';
import Login from './Login';
import Signup from './Signup';
import MyProfile from './MyProfile';

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<Map />
							)}
						/>
						<Route
							path="/login"
							render={() => (
								<Login />
							)}
						/>
						<Route
							path="/signup"
							render={() => (
								<Signup />
							)}
						/>
							<Route
							path="/myprofile"
							render={() => (
								<MyProfile />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}

