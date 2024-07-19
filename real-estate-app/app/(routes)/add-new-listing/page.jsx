import React from 'react';
import GoogleAddressSearch from '../../_components/GoogleAddressSearch'

function AddNewListing() {
    return (
        <div className='flex flex-col gap-5 justify-center items-center p-10 '>
            <h2 className='text-2xl font-bold'>AddNewListing</h2>
            <div>
                <h2 className='font-medium text-gray-400'>Enter Address which you want to add</h2>
                <GoogleAddressSearch />
            </div>
        </div>
    )
}

export default AddNewListing