import React from 'react';
import DevicesInteractor from '../../data/interactor/devices';
import Device from './device';

class Devices extends React.Component {
	constructor() {
        super();
        
        this.devicesInteractor = new DevicesInteractor();

        this.state = {
            devices: []
        };
    }
    
    componentDidMount() {
        this.fetchDevices();
    }

    fetchDevices() {
        this.devicesInteractor.get((devices) => {
            this.setState(() => {
                devices: devices
            });
        }, (error) => {
            console.error(error);
        });
    }

	render() {
        const { devices } = this.state;
		return (
			<div>
                {devices.map((device, index) => <Device key={index} device={device}/>)}
			</div>
		);
	}
}

export default Devices;
