"use client"
import { MapPin } from 'lucide-react';
import React from 'react';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

function GoogleAddressSearch({ selectedAddress, setCoordinates }) {
    return (
        <div className='flex items-center w-full'>
            <MapPin className='text-primary bg-primary/25 rounded-l-lg p-2 h-10 w-10' />
            <GooglePlacesAutocomplete
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
                selectProps={{
                    placeholder: "Search Property",
                    isClearable: true,
                    className: "w-full",
                    onChange: (place) => {
                        console.log(place)
                        selectedAddress(place);
                        geocodeByAddress(place.label)
                            .then((results) => getLatLng(results[0]))
                            .then(({ lat, lng }) => {
                                setCoordinates({ lat, lng })
                            })
                    }
                }}
            />
        </div>
    )
}

export default GoogleAddressSearch