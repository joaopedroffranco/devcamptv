import DevicesGateway from '../gateway/devices';
import FirebaseGateway from '../gateway/firebase';

class Devices {
	static getMy(success, failed) {
		DevicesGateway.devices()
			.then((response) => {
				success(response.data);
			})
			.catch((error) => {
				failed(error);
			});
	}

	static get(on) {
		FirebaseGateway.devices()
			.on('value', (snapshot) => {
				const devices = [];
				const values = snapshot.val();
				Object.keys(values).forEach((key) => {
					const device = values[key];
					device.key = key;
					devices.push(device);
				});
				on(devices);
			});
	}

	static set(name, on) {
		FirebaseGateway.deviceOn(name)
			.set(on);
	}
}

export default Devices;
