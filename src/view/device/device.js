import React from 'react';
import './style.css';

class Device extends React.Component {
    toggle(device) {
        console.log(device);
    }

	render() {
        const { device, getref } = this.props;
        const { id, name } = device;
		return (
            <div className="device-container">
                <p>{id}</p>
			    <button
                    ref={getref}
                    className="device-button"
                    onClick={() => { this.toggle(device); }}
                >{name}
                </button>
            </div>
		);
	}
}

export default Device;
