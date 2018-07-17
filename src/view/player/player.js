import React from 'react';
import SambaPlayer from '../../module/player/samba';
import ShakaPlayer from '../../module/player/shaka';

class Player extends React.Component {
	constructor(props) {
		super(props);

		const { location } = props;
		const { ...media } = location.state;
		this.state = {
			media: media
		};

		this.player = new SambaPlayer();
	}

	componentDidMount() {
		console.log('did mount');
		this.player.initWith();
	}

	render() {
		const { media } = this.state;
		const PlayerTag = this.player.render;
		console.log('render', media);

		return (
			<div>
				{media && <PlayerTag media={media} />}
			</div>
		);
	}
}

export default Player;
