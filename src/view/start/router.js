import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Videos from '../videos/videos';
import Player from '../player/player';

class Router extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/videos" component={Videos} />
				<Route exact path="/player" component={Player} />
			</Switch>
		);
	}
}

export default Router;
