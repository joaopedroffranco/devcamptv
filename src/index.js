import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Router from './view/start/router';
import './index.css';

const script = document.createElement('script');
script['samba-player-api'] = 'player';
script.type = 'text/javascript';
// script.crossOrigin = 'http://172.16.121.36:3000';
script.src = 'https://player.sambatech.com.br/v3/samba.player.api.js';
document.body.appendChild(script);

ReactDOM.render((
	<BrowserRouter>
		<Router />
	</BrowserRouter>), document.getElementById('root'));

registerServiceWorker();
