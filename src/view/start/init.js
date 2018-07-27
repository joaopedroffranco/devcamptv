import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from 'startv/navigation/navigation';
import Plataform from 'startv/tv/plataform';
import ReactDOM from 'react-dom';
import Home from '../home/home';
import Preload from '../preload/preload';

Navigation.findNode = ReactDOM.findDOMNode;
Plataform.current = new Plataform();

class Init extends React.Component {
	render() {
		console.log('aaa');
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
