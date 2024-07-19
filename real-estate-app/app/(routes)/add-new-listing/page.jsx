"use client"
import React, { useState } from 'react';
import GoogleAddressSearch from '../../_components/GoogleAddressSearch'
import { Button } from '../../../components/ui/button';
import { supabase } from '../../../utils/supabase/client';
import { useUser } from '@clerk/nextjs';

function AddNewListing() {
    const [selectedAddress, setSelectedAddress] = useState();
    const [coordinates, setCoordinates] = useState();
    const { user } = useUser()

    const nextHandler = async () => {
        console.log(selectedAddress, coordinates);

        const { data, error } = await supabase
            .from('listing')
            .insert([
                {
                    address: selectedAddress.label,
                    coordinates: coordinates,
                    createdBy: user?.primaryEmailAddress
                },
            ])
            .select();
        if (data) {
            console.log("New data", data)
        }
        if (error) {
            console.log(error)
        }

    }

    return (
        <div className='mt-10 md:mx-56 lg:mx-80'>
            <div className='flex flex-col gap-5 justify-center items-center p-10 '>
                <h2 className='text-2xl font-bold'>AddNewListing</h2>
                <div className='p-5 rounded-lg border shadow-md flex flex-col gap-5'>
                    <h2 className='font-medium text-gray-500'>Enter Address which you want to add</h2>
                    <GoogleAddressSearch
                        selectedAddress={(value) => setSelectedAddress(value)}
                        setCoordinates={(value) => setCoordinates(value)}
                    />
                    <Button disabled={!selectedAddress || !coordinates}
                        onClick={nextHandler}>Next</Button>
                </div>
            </div>
        </div>

    )
}

export default AddNewListing