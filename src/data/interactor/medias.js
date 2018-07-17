import MediasGateway from '../gateway/medias';

class Medias {
	constructor() {
		this.gateway = new MediasGateway();
	}

	get(success, failed) {
		this.gateway.medias()
			.then((response) => {
				success(response.data);
			})
			.catch((error) => {
				failed(error);
			});
	}
}

export default Medias;
