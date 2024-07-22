import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '80vh',
    borderRadius: '10px'
};

function GoogleMapsSection({ coordinates }) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    });

    const [center, setCenter] = useState({
        lat: -3.745,
        lng: -38.523
    });
    const [map, setMap] = React.useState(null);


    useEffect(() => {
        if (coordinates) {
            setCenter(coordinates)
        }
    }, [coordinates])

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy! 
        /// remember to replace with your map instance
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    if (loadError) {
        return <div>Error loading Google Maps</div>;
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    ) : (
        <div>Loading...</div>
    );
}

export default GoogleMapsSection;
