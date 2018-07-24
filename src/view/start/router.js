import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../home/home';

class Router extends React.Component {
	constructor() {
		super();
		if (window.location.pathname === '/') {
			window.location.pathname = '/home'
		}
	}

	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/home" component={Home} />
				</Switch>
			</div>
		);
	}
}

export default Router;
