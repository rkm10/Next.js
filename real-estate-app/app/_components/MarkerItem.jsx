import { MarkerF, OverlayView } from '@react-google-maps/api'
import React, { useState } from 'react'
import MarkerListingItem from './MarkerListingItem';

function MarkerItem({ item }) {
    const [selectedListing, setSelectedListing] = useState();

    return (
        <div>
            <MarkerF
                position={item.coordinates}
                onClick={() => setSelectedListing(item)}
                icon={{
                    url: `/house.svg`,
                    scaledSize: {
                        width: 60,
                        height: 60
                    }//new window.google.maps.Size(50, 50) , you use this as well
                }}
            >
                {selectedListing && <OverlayView
                    position={selectedListing.coordinates}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >

                    <MarkerListingItem
                        closeHandler={() => setSelectedListing(null)}
                        item={selectedListing} />


                </OverlayView>}


            </MarkerF>
        </div>
    )
}

export default MarkerItem