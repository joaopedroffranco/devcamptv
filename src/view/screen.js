import React from 'react';
import Plataform from '../module/tv/plataform';

class Screen extends React.Component {
	constructor() {
		super();
		
		this.addListeners();
	}

	componentWillUnmount() {
		this.removeListeners();
	}

	addListeners() {
		window.addEventListener('keydown', this.move.bind(this));
	}

	removeListeners() {
		window.removeEventListener('keydown', this.move.bind(this));
    }

	move(event) {
		const { keyCode } = event;
		Plataform.current.navigation.move(keyCode);
	}

	onReturn() {
		console.log('on return');
	}

	onExit() {
		console.log('on exit');
	}
}

export default Screen;
