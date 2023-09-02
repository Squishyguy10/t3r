import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Key from './google-maps-api-key';

const containerStyle = {
    width: '400px',
    height: '400px',
};

const center = {
    lat: 43.3187363,
    lng: -79.8416009,
};

const GoogleMaps = () => {
    const [map, setMap] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        if (!map) return;

        const service = new window.google.maps.places.PlacesService(map);
        const request = {
            query: searchQuery,
            location: center,
            radius: 1000, // Adjust the radius as needed
        };

        service.textSearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setSearchResults(results);
            }
        });
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Search for buildings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <LoadScript googleMapsApiKey={Key()}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={14}
                    onLoad={(map) => setMap(map)}
                >
                    {searchResults.map((result) => (
                        <Marker
                            key={result.place_id}
                            position={{
                                lat: result.geometry.location.lat(),
                                lng: result.geometry.location.lng(),
                            }}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default GoogleMaps;
