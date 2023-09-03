import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { loadGoogleMapsAPI } from './google-maps-api';
import { ListBulletIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Key from './google-maps-api-key';
import Map from './Map';

class Recommendations extends Component {

	constructor(props) {
		super(props);
		this.state = {
			gptMsg: 'Loading...',
			googleMaps: null,
			location: null,
			place: '',
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
				body: JSON.stringify({ uuid: user_id }),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					if (data.result) {
						console.log(data.result);
						this.setState({ gptMsg: data.result });
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

	componentDidMount() {

		loadGoogleMapsAPI(Key())
			.then((maps) => {
				this.setState({ googleMaps: maps });
			})
			.catch((error) => {
				console.error('Error loading Google Maps API:', error);
			});
	}

	handleSelect = async (selectedAddress) => {
		try {
			const results = await geocodeByAddress(selectedAddress);
			const latLng = await getLatLng(results[0]);
			this.setState({ location: latLng });
			this.setState({ place: selectedAddress });
			console.log('Selected location:', latLng);
		}
		catch (error) {
			console.error('Error selecting location:', error);
		}
	};

	render() {
		const { googleMaps } = this.state;
		return (
			<div className='container px-5 mx-auto text-center lg:px-40'>
				<div className='flex flex-col w-full mb-10'>
					<ListBulletIcon className='mx-auto inline-block w-10 py-10' />
					<h1 className='sm:text-4xl text-3xl font-medium title-font font-display pb-10'>
						Recommendations
					</h1>

					<p className='text-lg pb-40'>{this.state.gptMsg}</p>
				</div>
				<div className='flex flex-col w-full mb-10'>
					<MapPinIcon className='mx-auto inline-block w-10 py-10' />
					<h1 className='sm:text-4xl text-3xl font-medium title-font font-display pb-5'>
						Nearby Facilities
					</h1>
					<div>
						{googleMaps &&
							<div>
								<PlacesAutocomplete
									value={this.state.place}
									onChange={(newPlace) => { this.setState({ place: newPlace }) }}
									onSelect={this.handleSelect}
								>
									{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
										<div className='flex flex-col py-2 pb-48'>
											<input
												{...getInputProps({
													type: 'search',
													placeholder: 'Location',
													className: 'border p-2',
													size: '40',
												})}
											/>
											<div>
												{loading ? <div>Loading...</div> : null}
												{suggestions.map((suggestion) => {
													const className = suggestion.active
														? 'suggestion-item--active'
														: 'suggestion-item';
													return (
														<div
															{...getSuggestionItemProps(suggestion, {
																className,
															})}
														>
															{suggestion.description}
														</div>
													);
												})}
											</div>
										</div>
									)}
								</PlacesAutocomplete>
							</div>
						}
						{this.state.location != null ? <Map lat={this.state.location.lat} lng={this.state.location.lng} /> : <></>}
					</div>
				</div>
			</div>
		);
	}

}

export default Recommendations;