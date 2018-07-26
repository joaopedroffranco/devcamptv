import React from 'react';
import DevicesInteractor from '../../data/interactor/devices';
import Device from './device';

class Devices extends React.Component {
	constructor() {
        super();

        this.state = {
            devices: []
        };
    }
    
    componentDidMount() {
        this.fetchDevices();
    }

    componentWillUpdate() {
        const { devices } = this.state;
        this.devicesRefs = Array(devices.length);
    }

    componentDidUpdate() {
        const { updateNavigation } = this.props;
        updateNavigation();
    }

    fetchDevices() {
        DevicesInteractor.get((devices) => {
            this.setState({
                devices: devices
            });
        });
    }

	render() {
        const { devices } = this.state;
		return (
			<div>
                {devices && devices.map((device, index) =>
                    <Device
                        navigationref={(ref) => this.devicesRefs[index] = ref}
                        key={index}
                        device={device}
                    />
                )}
			</div>
		);
	}
}

export default Devices;
