import React from 'react';
import Plataform from 'startv/tv/plataform';
import Navigation from 'startv/navigation/navigation';
import Track from 'startv/navigation/track';
import Devices from '../device/devices';
import Screen from '../screen';
import './style.css';

class Home extends Screen {
	constructor() {
		super();

		this.onReturn = this.onReturn.bind(this);
		this.onExit = this.onExit.bind(this);
	}

	componentDidMount() {
		Plataform.current.navigation.set(this.onReturn, this.onExit);
		Plataform.current.navigation.setType(new Track(0, Navigation.types.horizontaltrack, 0));
	}

	componentDidUpdate() {
		this.updateNavigation();
	}

	updateNavigation() {
		const elements = this.devicesComponent ? this.devicesComponent.devicesRefs : [];
		Plataform.current.navigation.update([elements])
		Plataform.current.navigation.focus();
	}

	render() {
		return (
			<div className="home-container">
				<p>Olá, nós fazemos app para SmartTVs</p>
				<Devices
					ref={(ref) => { this.devicesComponent = ref}}
					updateNavigation={this.updateNavigation.bind(this)}
				/>
			</div>
		);
	}
}

export default Home;
