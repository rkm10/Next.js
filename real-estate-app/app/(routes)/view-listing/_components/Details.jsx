import { Bath, BedDouble, CarFront, Drill, Home, LandPlot, MapPin, Share } from 'lucide-react'
import React from 'react'
import { Button } from '../../../../components/ui/button'
import AgentDetails from './AgentDetails'
import GoogleMapsSection from '../../../_components/GoogleMapsSection'

function Details({ listingDetails }) {
    return listingDetails && (
        <div className='my-6 flex gap-2 flex-col'>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col gap-2'>
                    <h2 className='font-bold text-3xl'>$ {listingDetails.price}</h2>
                    <h2 className='text-gray-500 text-lg flex gap-2'>
                        <MapPin />
                        {listingDetails.address}
                    </h2>
                </div>
                <Button className="flex gap-2"><Share /> Share</Button>
            </div>
            <hr></hr>


            <div className='mt-4 flex flex-col gap-3'>
                <h2 className='font-bold text-2xl'>Key Features</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4 font-bold'>
                    <h2 className='flex gap-2 items-center bg-primary/20 rounder-lg p-3 text-primary justify-center '>
                        <Home /> {listingDetails.propertyType}
                    </h2>
                    <h2 className='flex gap-2 items-center bg-primary/20 rounder-lg p-3 text-primary justify-center '>
                        <Drill /> Built in {listingDetails.builtIn}
                    </h2>
                    <h2 className='flex gap-2 items-center bg-primary/20 rounder-lg p-3 text-primary justify-center '>
                        <LandPlot /> {listingDetails.lotSize}
                    </h2>
                    <h2 className='flex gap-2 items-center bg-primary/20 rounder-lg p-3 text-primary justify-center '>
                        <BedDouble /> {listingDetails.bedroom} Bed
                    </h2>
                    <h2 className='flex gap-2 items-center bg-primary/20 rounder-lg p-3 text-primary justify-center '>
                        <Bath /> {listingDetails.bathroom} Bath
                    </h2>
                    <h2 className='flex gap-2 items-center bg-primary/20 rounder-lg p-3 text-primary justify-center '>
                        <CarFront /> {listingDetails.parking} Parking
                    </h2>
                </div>

                <div className='mt-4'>
                    <h2 className='text-3xl font-extrabold mb-3'>What's Special</h2>
                    <p className='text-gray-500 text-lg'>{listingDetails.description}</p>
                </div>

                <div>
                    <h2 className='font-bold text-2xl'>Find on Map</h2>
                    <GoogleMapsSection
                        coordinates={listingDetails.coordinates}
                        latestListing={[listingDetails]}
                    />
                </div>

                <div>
                    <AgentDetails listingDetails={listingDetails} />
                </div>
            </div>
        </div>
    )
}

export default Details