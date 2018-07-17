import React from 'react';

class Samba {
	render(props) {
		const { media } = props;
		console.log(media);
		console.log('render player');
		return (
			<div id="player" />
		);
	}

	initWith() {
		const playerConfig = {
			height: 1080,
			width: 1920,
			ph: '442189dbff37920ceae523517366b5fd',
			m: '084e499f765333de89193f7e60d5b625',
			events: {
				'*': 'eventListener'
			},
			playerParams: {
				wideScreen: true
			}
		};
		const player = new window.SambaPlayer('player', playerConfig);
		console.log(player);
	}
}

export default Samba;
