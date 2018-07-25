import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import Home from '../home/home';
import Navigation from '../../module/navigation/navigation';
import Plataform from '../../module/tv/plataform';

Navigation.findNode = ReactDOM.findDOMNode;
Plataform.current = new Plataform();

class Init extends React.Component {
	render() {
		return (
			<div>
				<Switch>
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
