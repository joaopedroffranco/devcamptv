import React from 'react';
import { Link } from 'react-router-dom';

class Video extends React.PureComponent {
	render() {
		const { video } = this.props;
		const { title } = video;

		return (
			<div>
				<Link
					to={{ pathname: '/player', state: video }}
				>
					{title}
				</Link>
			</div>
		);
	}
}

export default Video;
