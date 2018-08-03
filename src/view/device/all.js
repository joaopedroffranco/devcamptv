import React from 'react';
import DevicesInteractor from '../../data/interactor/devices';
import './style.css';

class All extends React.Component {
    constructor() {
        super();
        this.allRefs = Array(2);
    }

    componentDidMount() {
        const { updateNavigation } = this.props;
        updateNavigation();
    }

    on() {
        DevicesInteractor.onAll();
    }

    off() {
        DevicesInteractor.offAll();
    }

	render() {
		return (
            <div>
                <button
                    className={`device-button`}
                    ref={(ref) => { this.allRefs[0] = ref; }}
                    onClick={this.on.bind(this)}
                >
                    <p>ON</p>
                </button>
                <button
                    className={`device-button`}
                    ref={(ref) => { this.allRefs[1] = ref; }}
                    onClick={this.off.bind(this)}
                >
                    <p>OFF</p>
                </button>
            </div>
		);
	}
}

export default All;
