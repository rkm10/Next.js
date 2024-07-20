import { BathIcon, BedDouble, MapPin, Ruler, Search } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import GoogleAddressSearch from './GoogleAddressSearch'
import { Button } from '../../components/ui/button'

function Listing({ latestListing, handleSearchClick }) {
    return (
        <div>
            <div className='p-3 flex gap-6'>
                <GoogleAddressSearch
                    selectedAddress={(v) => console.log(v)}
                    setCoordinates={(v) => console.log(v)}

                />
                <Button className="flex gap-2"
                    onClick={handleSearchClick}
                ><Search calssName="h-4 w-4" />Search</Button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {latestListing?.length > 0 ? latestListing.map((item, index) => (
                    <div className='p-3 hover:border hover:border-primary cursor-pointer rounded-lg' >
                        <Image src={item.listingImages[0].url}
                            width={800}
                            height={150}
                            // alt={item.name}
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
                ))
                    : [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                        <div key={index} className='h-[230px] w-full bg-slate-200 animate-pulse rounded-lg'>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Listing