import React, { useEffect, useState, useContext } from "react";
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
import ProtectedRoute from './ProtectedRoute';
import Reccomendations from './Reccomendations';

export default class App extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
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

						<ProtectedRoute exact path='/' component={Map} />
						<ProtectedRoute exact path='/profile/:name' component={Profile} />
						<ProtectedRoute exact path='/business/:businessname' component={Business} />
						<ProtectedRoute exact path='/review/:businessname' component={Review} />
						<ProtectedRoute exact path='/reccomendations/:userid' component={Reccomendations } />
						<ProtectedRoute exact path='*' component={Map} />

					</Switch>
				</Router>
			</div>
		);
	}
}

