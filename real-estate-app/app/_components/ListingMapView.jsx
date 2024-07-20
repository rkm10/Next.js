'use client'
import React, { useEffect } from 'react'
import Listing from './Listing'
import supabase from '../../utils/supabase/client'

function ListingMapView({ type }) {
    useEffect(() => {
        getLatestListing();
    }, [])

    const getLatestListing = async () => {
        const { data, error } = await supabase
            .from('listing')
            .select('*,listingImages(listing_id,url)')
            .eq('active', true)
            .eq('type', type)
        if (data) {
            console.log(data)
        }
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div>
                <Listing />
            </div>
            <div>
                Map
            </div>
        </div>
    )
}

export default ListingMapView