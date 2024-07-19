"use client"
import React, { useState } from 'react';
import GoogleAddressSearch from '../../_components/GoogleAddressSearch'
import { Button } from '../../../components/ui/button';
import { supabase } from '../../../utils/supabase/client';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { Loader, LoaderPinwheel } from 'lucide-react';

function AddNewListing() {
    const [selectedAddress, setSelectedAddress] = useState();
    const [coordinates, setCoordinates] = useState();
    const { user } = useUser()
    const [loader, setLoader] = useState(false);

    const nextHandler = async () => {
        setLoader(true)
        console.log(selectedAddress, coordinates);

        const { data, error } = await supabase
            .from('listing')
            .insert([
                {
                    address: selectedAddress.label,
                    coordinates: coordinates,
                    createdBy: user?.primaryEmailAddress.emailAddress,
                },
            ])
            .select();
        if (data) {
            setLoader(false)
            console.log("New data =========================", data)
            toast("New Address Added for listing Successfully")
        }
        if (error) {
            setLoader(false)
            console.log(error)
            toast("there is some error")
        }

    }

    return (
        <div className='mt-10 md:mx-56 lg:mx-80 pt-10'>
            <div className='flex flex-col gap-5 justify-center items-center p-10 '>
                <h2 className='text-2xl font-bold'>AddNewListing</h2>
                <div className='p-5 rounded-lg border shadow-md flex flex-col gap-5'>
                    <h2 className='font-medium text-gray-500'>Enter Address which you want to add</h2>
                    <GoogleAddressSearch
                        selectedAddress={(value) => setSelectedAddress(value)}
                        setCoordinates={(value) => setCoordinates(value)}
                    />
                    <Button disabled={!selectedAddress || !coordinates || loader}
                        onClick={nextHandler}>
                        {loader ? <LoaderPinwheel className='w-4 h-4 animate-spin' /> : "Add"}
                    </Button>
                </div>
            </div>
        </div>

    )
}

export default AddNewListing