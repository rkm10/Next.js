import { BathIcon, BedDouble, MapPin, Ruler } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function MarkerListingItem({ item }) {
    return (
        <div>
            <div className='p-3 hover:border hover:border-primary cursor-pointer rounded-lg' >
                <Image src={item.listingImages[0].url}
                    width={800}
                    height={150}
                    alt={item.name}
                    className='rounded-lg object-cover h-[150px]'
                />
                <div className='flex mt-2 flex-col gap-2'>
                    <h2 className='font-bold text-xl'>${item.price}</h2>
                    <h2 className='flex gap-2 text-sm text-gray-500'><MapPin className='h-6 w-6' />{item.address}</h2>
                    <div className='flex gap-2 mt-2 justify-between '>
                        <h2 className='flex gap-2 text-sm text-gray-500 bg-slate-200 rounded-md p-2 justify-center w-full'>
                            <BedDouble className='h-4 w-4' />
                            {item.bedroom}
                        </h2>
                        <h2 className='flex gap-2 text-sm text-gray-500 bg-slate-200 rounded-md p-2 justify-center w-full'>
                            <BathIcon className='h-4 w-4' />
                            {item.bathroom}
                        </h2>
                        <h2 className='flex gap-2 text-sm text-gray-500 bg-slate-200 rounded-md p-2 justify-center w-full'>
                            <Ruler className='h-4 w-4' />
                            {item.area}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarkerListingItem