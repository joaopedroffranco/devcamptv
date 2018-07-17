import React from 'react';
import MediasInteractor from '../../data/interactor/medias';
import Video from './video';

class Videos extends React.Component {
	constructor() {
		super();

		this.mediasInteractor = new MediasInteractor();

		this.state = {
			videos: []
		};
	}

	componentDidMount() {
		this.fetchMedias();
	}

	fetchMedias() {
		this.mediasInteractor.get((medias) => {
			this.setState({
				videos: medias
			});
		}, (error) => {
			console.log(error);
		});
	}

	render() {
		const { videos } = this.state;
		return (
			<div>
				{videos.map((video, index) => (
					<Video
						key={index}
						video={video}
					/>
				))}
			</div>
		);
	}
}

export default Videos;
