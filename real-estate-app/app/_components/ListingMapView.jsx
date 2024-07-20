'use client'
import React, { useEffect, useState } from 'react'
import Listing from './Listing'
import { supabase } from '../../utils/supabase/client'
import { toast } from 'sonner'

function ListingMapView({ type }) {
    const [latestListing, setLatestListing] = useState([])
    useEffect(() => {
        getLatestListing();
    }, [])

    const getLatestListing = async () => {
        const { data, error } = await supabase
            .from('listing')
            .select(`*,listingImages(
                listing_id,
                url)`)
            .eq('active', true)
            .eq('type', type)
            .order('id', { ascending: false })
        if (data) {
            console.log(data);
            setLatestListing(data)
        }
        if (error) {
            toast('server side error')
        }
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div>
                <Listing latestListing={latestListing} handleSearchClick={handleSearchClick} />
            </div>
            <div>
                Map
            </div>
        </div>
    )
}

export default ListingMapView