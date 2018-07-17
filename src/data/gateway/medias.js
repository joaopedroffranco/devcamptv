import axios from 'axios';
import mock from '../mock/medias';

class Medias {
	constructor() {
		const baseURL = 'http://api.sambavideos.sambatech.com/v1';

		this.api = axios.create({
			baseURL: `${baseURL}/api/medias`
		});
	}

	medias() {
		return new Promise((resolve) => {
			resolve({ data: mock.examples });
		});
		// return this.api.instance.get('/medias');
	}
}

export default Medias;
