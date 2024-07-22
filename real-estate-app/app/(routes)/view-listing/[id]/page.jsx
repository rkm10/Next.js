"use client"
import React, { useEffect, useState } from 'react'
import { supabase } from '../../../../utils/supabase/client'
import { toast } from 'sonner'
import Slider from '../_components/Slider'
import Details from '../_components/Details'


function ViewListing({ params }) {
    const [listingDetails, setListingDetails] = useState([])

    useEffect(() => {
        GetListingDetails()
    }, [])

    const GetListingDetails = async () => {
        const { data, error } = await supabase
            .from('listing')
            .select('*,listingImages( url,listing_id)')
            .eq('id', params.id)
            .eq('active', true)
        if (data) {
            setListingDetails(data[0])
            console.log(data)
        }
        if (error) {
            toast('server side error!')
        }
    }
    return (
        <div className='px-4 md:px-32 lg:px-56 py-5'>
            <Slider imageList={listingDetails?.listingImages} />
            <Details listingDetails={listingDetails} />
        </div>
    )
}

export default ViewListing