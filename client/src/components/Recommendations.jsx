import React, { Component } from 'react';
import { ListBulletIcon, MapPinIcon } from '@heroicons/react/24/outline';

class Recommendations extends Component {

	constructor(props) {
		super(props);
		this.state = {
			gptMsg: 'Loading...',
		};
		
		if (!Recommendations.executeSecond) {
			Recommendations.executeSecond = true;
		}
		else if (Recommendations.executeSecond) {
			const queryParams = new URLSearchParams(window.location.search);
			const user_id = queryParams.get('uuid');

			fetch('http://localhost:3001/get_survey_results', {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
				},
				body: JSON.stringify({uuid: user_id}),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					if (data.result) {
						console.log(data.result);
						this.setState({gptMsg: data.result});
					}
					else {
						console.error('Survey response not found.');
					}
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		}
	}


	render() {
		return (
			<div className='container px-5 mx-auto text-center lg:px-40'>
				<div className='flex flex-col w-full mb-10'>
					<ListBulletIcon className='mx-auto inline-block w-10 py-10' />
					<h1 className='sm:text-4xl text-3xl font-medium title-font font-display pb-10'>
						Recommendations
					</h1>

					<p className='text-lg pb-52'>{this.state.gptMsg}</p>
				</div>
				<div className='flex flex-col w-full mb-10'>
					<MapPinIcon className='mx-auto inline-block w-10 py-10' />
					<h1 className='sm:text-4xl text-3xl font-medium title-font font-display pb-10'>
						Nearby Facilities
					</h1>
				</div>
			</div>
		);
	}

}

export default Recommendations;