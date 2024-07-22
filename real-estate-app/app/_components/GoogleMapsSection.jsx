import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MarkerItem from './MarkerItem';

const containerStyle = {
    width: '100%',
    height: '80vh',
    borderRadius: '10px'
};

function GoogleMapsSection({ coordinates, latestListing }) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    });

    const [center, setCenter] = useState({
        lat: 12.9715987,
        lng: 77.5945627
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
        // const bounds = new window.google.maps.LatLngBounds(center);
        // map.fitBounds(bounds);

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
            zoom={14}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <>
                {latestListing.map((item, index) => (
                    <MarkerItem key={index} item={item} />
                ))
                }
            </>
        </GoogleMap>
    ) : (
        <div>Loading...</div>
    );
}

export default GoogleMapsSection;
