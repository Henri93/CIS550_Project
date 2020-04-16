import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
import Map from './Map';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import Business from './Business';
import Review from './Review';

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
							exact
							path="/Map"
							render={() => (
								<Redirect to = "/" />
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
								path="/profile/:name"
								component={Profile}

								render={() => (
									<Profile />
								)}
							/>
							<Route
								path="/business/:businessname"
								component={Business}
								render={() => (
									<Business />
								)}
							/>
							<Route
								path="/review/:businessname"
								component={Review}
								render={() => (
									<Business />
								)}
							/>
					</Switch>
				</Router>
			</div>
		);
	}
}

