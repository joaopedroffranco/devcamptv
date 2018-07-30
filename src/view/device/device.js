import React from 'react';
import DevicesInteractor from '../../data/interactor/devices';
import './style.css';

class Device extends React.Component {
    toggle() {
        const { device } = this.props;
        const { key, on } = device;
        DevicesInteractor.set(key, !on);
    }

	render() {
        const { device, navigationref } = this.props;
        const { name, on } = device;

        const buttonIsOn = on ? 'on' : 'off';

		return (
            <button
                className={`device-button`}
                ref={navigationref}
                onClick={() => { this.toggle(device); }}
            >
                <p>{name}</p>
                <div className={`device-toggle ${buttonIsOn}`} />
            </button>
		);
	}
}

export default Device;
