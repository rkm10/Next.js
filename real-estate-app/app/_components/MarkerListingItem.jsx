import { BathIcon, BedDouble, MapPin, Ruler, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '../../components/ui/button'
import Link from 'next/link'

function MarkerListingItem({ item, closeHandler }) {
    return (
        <div>
            <div className=' cursor-pointer rounded-lg w-[180px]' >
                <X onClick={() => closeHandler(item.id)} />
                <Image src={item.listingImages[0].url}
                    width={800}
                    height={150}
                    alt={item.name}
                    className='rounded-lg object-cover h-[120px] w-[180px]'
                />
                <div className='flex mt-2 flex-col gap-2 bg-white p-2'>
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
                    </div>
                    <Link href={'view-listing/' + item.id} >
                        <Button className="w-full" size='sm'>View Details</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MarkerListingItem