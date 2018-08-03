import axios from 'axios';
import mock from '../mock/devices';

class Devices {
	static api() {
		const baseURL = 'http://dextra-lights.appspot.com';

		return axios.create({
			baseURL: `${baseURL}`
		});
	}

	static devices() {
		return new Promise((resolve) => {
			resolve({ data: mock.examples });
		});
		// return Devices.api().get('/Devices');
	}

	static onAll() {
		return Devices.api().get('/turn-on-all-lights');
	}

	static offAll() {
		return Devices.api().get('/turn-off-all-lights');
	}
}

export default Devices;
