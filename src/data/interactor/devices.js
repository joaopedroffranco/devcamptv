import DevicesGateway from '../gateway/devices';

class Devices {
	get(success, failed) {
		DevicesGateway.devices()
			.then((response) => {
				success(response.data);
			})
			.catch((error) => {
				failed(error);
			});
	}
}

export default Devices;
