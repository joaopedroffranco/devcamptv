import React from 'react';
import Devices from '../device/devices';
import Plataform from '../../module/tv/plataform';
import Navigation from '../../module/navigation/navigation';
import Screen from '../screen';

class Home extends Screen {
	constructor() {
		super();

		this.onReturn = this.onReturn.bind(this);
		this.onExit = this.onExit.bind(this);

		this.devicesComponent = React.createRef();
	}

	componentDidMount() {
		Plataform.current.navigation.set(this.onReturn, this.onExit, Navigation.types.verticaltrack);
	}

	componentDidUpdate() {
		this.updateNavigation();
	}

	updateNavigation() {
		if (this.devicesComponent) {
			const elements = this.devicesComponent.current.devicesRefs;
			Plataform.current.navigation.update([elements])
		}
	}

	render() {
		return (
			<div>
				<p>Olá, nós fazemos app para SmartTVs</p>
				<Devices
					ref={this.devicesComponent}
					updateNavigation={this.updateNavigation.bind(this)}
				/>
			</div>
		);
	}
}

export default Home;
