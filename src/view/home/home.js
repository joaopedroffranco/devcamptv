import React from 'react';
import Devices from '../device/devices';

class Home extends React.Component {
	render() {
		return (
			<div>
				<p>Olá, nós fazemos app para SmartTVs</p>
				<Devices />
			</div>
		);
	}
}

export default Home;
