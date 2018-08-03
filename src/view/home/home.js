import React from 'react';
import Plataform from 'startv/tv/plataform';
import Navigation from 'startv/navigation/navigation';
import Track from 'startv/navigation/track';
import Devices from '../device/devices';
import Screen from '../screen';
import './style.css';
import All from '../device/all';

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
		const devicesElements = this.devicesComponent ? this.devicesComponent.devicesRefs : [];
		const allElements = this.allComponent ? this.allComponent.allRefs : [];
		Plataform.current.navigation.update([devicesElements, allElements])
		Plataform.current.navigation.focus();
	}

	onReturn() {
		Plataform.current.settings.exitApp();
	}

	render() {
		return (
			<div className="home-container">
				<p>Olá, nós fazemos app para SmartTVs</p>
				<Devices
					ref={(ref) => { this.devicesComponent = ref}}
					updateNavigation={this.updateNavigation.bind(this)}
				/>
				<All
					ref={(ref) => { this.allComponent = ref}}
					updateNavigation={this.updateNavigation.bind(this)}
				/>
			</div>
		);
	}
}

export default Home;
