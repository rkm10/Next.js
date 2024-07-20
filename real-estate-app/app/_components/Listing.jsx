import Image from 'next/image'
import React from 'react'

function Listing({ latestListing }) {
    return (
        <div>
            <div>
                {latestListing.map((item, index) => (
                    <div >
                        <Image src={item.listingImages[0].url}
                            width={800}
                            height={150}
                            alt={item.name}
                            className='rounded-lg object-cover h-[150px]'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Listing