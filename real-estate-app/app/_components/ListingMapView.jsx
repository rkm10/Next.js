'use client'
import React, { useEffect, useState } from 'react'
import Listing from './Listing'
import { supabase } from '../../utils/supabase/client'
import { toast } from 'sonner'

function ListingMapView({ type }) {
    const [latestListing, setLatestListing] = useState([]);
    const [searchedAddress, setSearchedAddress] = useState('');
    const [bedCount, setBedCount] = useState(0);
    const [bathCount, setBathCount] = useState(0);
    const [parkingCount, setParkingCount] = useState(0);
    const [homeType, setHomeType] = useState('');

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
        let query = supabase
            .from('listing')
            .select(`*,listingImages(
                listing_id,
                url)`)
            .eq('active', true)
            .eq('type', type)
            .gte('bedroom', bedCount)
            .gte('bathroom', bathCount)
            .gte('parking', parkingCount)
            .like('address', `%${searchTerm}%`) // search by address by name
            .order('id', { ascending: false })
        if (homeType) {
            query = query.eq('propertyType', homeType)
        }

        const { data, error } = await query;
        if (data) {
            setLatestListing(data);
        }
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div>
                <Listing latestListing={latestListing}
                    handleSearchClick={handleSearchClick}
                    searchedAddress={(v) => setSearchedAddress(v)}
                    setBathCount={setBathCount}
                    setBedCount={setBedCount}
                    setHomeType={setHomeType}
                    setParkingCount={setParkingCount}
                />
            </div>
            <div>
                Map
            </div>
        </div>
    )
}

export default ListingMapView