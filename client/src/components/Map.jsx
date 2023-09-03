import React, { Component } from 'react';
import Key from './google-maps-api-key';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            markers: [],
            infoWindows: [],
            searchQuery: '',
            lat: props.lat,
            lng: props.lng,
        };
    }

    componentDidMount() {

        if (typeof window.google === 'undefined' || typeof window.google.maps === 'undefined') {
            this.loadGoogleMapsAPI();
        } else {
            this.searchRecyclingLocations();
        }
    }

    loadGoogleMapsAPI = () => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${Key()}&libraries=places&callback=initMap`;
        script.async = true;
        document.head.appendChild(script);
        script.onload = this.searchRecyclingLocations;
    };

    searchRecyclingLocations = () => {
        const center = { lat: this.state.lat, lng: this.state.lng }; 

        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: center,
            zoom: 12,
        });

        const service = new window.google.maps.places.PlacesService(map);
        const request = {
            location: center,
            radius: 10000, 
            keyword: 'Recycling', 
        };

        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {

                const newMarkers = results.map((result) => {
                    const marker = new window.google.maps.Marker({
                        position: {
                            lat: result.geometry.location.lat(),
                            lng: result.geometry.location.lng(),
                        },
                        title: result.name,
                        map: map,
                    });


                    const infoWindow = new window.google.maps.InfoWindow({
                        content: `<div><strong>${result.name}</strong><br>${result.vicinity}</div>`,
                    });

                    marker.addListener('click', () => {
                        this.closeAllInfoWindows();
                        infoWindow.open(map, marker);
                    });

                    return marker;
                });

                this.setState({ markers: newMarkers });
            } else {
                console.error('Nearby search request failed with status:', status);
            }
        });

        this.setState({ map });
    };

    closeAllInfoWindows = () => {
        this.state.infoWindows.forEach((infoWindow) => {
            infoWindow.close();
        });
    };
    

    render() {
        return (

            <div id="map" style={{ width: '100%', height: '400px' }} />

        );
    }
}

export default Map;
