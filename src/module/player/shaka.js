import React from 'react';
import shaka from 'shaka-player';

export default class Shaka {
	constructor() {
		this.media = null;
	}

	render(props) {
		console.log(props);
		console.log(this);
		const { media } = props;
		console.log(media);
		this.media = media;
		return <video id="video" width="1920" height="1080" autoPlay />;
	}

	initWith() {
		const url = 'http://d.sambavideos.sambatech.com/account/61/32/2014-06-11/video/084e499f765333de89193f7e60d5b625/SambanaCopa-03.mp4';
		console.log('open');
		shaka.polyfill.installAll();
		if (shaka.Player.isBrowserSupported()) {
			console.log('suported');
			const video = document.getElementById('video');
			const player = new shaka.Player(video);
			player.configure({
				abr: {
					manager: new shaka.abr.SimpleAbrManager()
				}
			});

			console.log(url);
			player.load(url).then(() => {
				console.log('loaded', url);
			}).catch(() => { this.error(); });

			player.addEventListener('error', (error) => { console.log('error', error); });
		}
	}
}
