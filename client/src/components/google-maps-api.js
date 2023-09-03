export const loadGoogleMapsAPI = () => {
	return new Promise((resolve, reject) => {
		if (window.google && window.google.maps) {
			resolve(window.google.maps);
		}
		else {
			const script = document.createElement('script');
			script.src = 'http://localhost:3001/proxy-gmaps';
			script.async = true;
			script.onload = () => {
				if (window.google && window.google.maps) {
					resolve(window.google.maps);
				}
				else {
					reject(new Error('Failed to load Google Maps API.'));
				}
			};
			document.head.appendChild(script);
		}
	});
};
