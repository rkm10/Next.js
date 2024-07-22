'use client'
import React, { useEffect, useState } from 'react'
import Listing from './Listing'
import { supabase } from '../../utils/supabase/client'
import { toast } from 'sonner'

function ListingMapView({ type }) {
    const [latestListing, setLatestListing] = useState([]);
    const [searchedAddress, setSearchedAddress] = useState('');

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

    const handleSearchClick = async () => {
        console.log(searchedAddress);
        const searchTerm = searchedAddress?.value?.structured_formatting?.main_text
        const { data, error } = await supabase
            .from('listing')
            .select(`*,listingImages(
                listing_id,
                url)`)
            .eq('active', true)
            .eq('type', type)
            .like('address', `%${searchTerm}%`) // search by address by name
            .order('id', { ascending: false })

        if (data) {
            setLatestListing(data);
        }
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div>
                <Listing latestListing={latestListing} handleSearchClick={handleSearchClick} searchedAddress={(v) => setSearchedAddress(v)} />
            </div>
            <div>
                Map
            </div>
        </div>
    )
}

export default ListingMapView