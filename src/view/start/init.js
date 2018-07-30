import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Plataform from 'startv/tv/plataform';
import Home from '../home/home';
import Preload from '../preload/preload';

Plataform.current = new Plataform();

class Init extends React.Component {
	render() {
		return (
			<div>
				<Preload />
				<Switch>
					<Route exact path={`/:device`} component={Home} />
					<Route path={`/:device/${Init.routers.home}`} component={Home} />
				</Switch>
			</div>
		);
	}
}

Init.routers = {
    home: 'home'
}

export default Init;
