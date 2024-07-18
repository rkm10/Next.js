import React from 'react'

function AddNewListing() {
    return (
        <div className='flex flex-col gap-5 justify-center items-center'>
            <h2 className='text-2xl font-bold'>AddNewListing</h2>
            <div>
                <h2 className='font-medium text-gray-400'>Enter Address which you want to add</h2>
                {/* <GooglePlacesAutocomplete
                    apiKey="****"
                /> */}
            </div>
        </div>
    )
}

export default AddNewListing