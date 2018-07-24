import React from 'react';

class Device extends React.Component {
	render() {
        const { device } = this.props;
        const { id, name } = device;
		return (
            <div>
                <p>id</p>
			    <a href='www.google.com.br'>name</a>
            </div>
		);
	}
}

export default Device;
