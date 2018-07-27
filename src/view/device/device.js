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
            <div className={`device-container ${buttonIsOn}`}>
                <p>{name}</p>
			    <button
                    ref={navigationref}
                    className="device-button"
                    onClick={() => { this.toggle(device); }}
                />
            </div>
		);
	}
}

export default Device;
