"use client"
import React, { useEffect, useState } from 'react'
import { supabase } from '../../../../utils/supabase/client'
import { toast } from 'sonner'

function ViewListing({ params }) {
    const [listing, setListing] = useState([])

    useEffect(() => {
        GetListingDetails()
    }, [])

    const GetListingDetails = async () => {
        const { data, error } = await supabase
            .from('listing')
            .select('*,listingImages(listing_id, url)')
            .eq('id', params.id)
            .eq('active', true)
        if (data) {
            setListing(data)
        }
        if (error) {
            toast('server side error')
        }
        return (
            <div>ViewListing</div>
        )
    }
}

export default ViewListing