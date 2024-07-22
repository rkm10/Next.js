import Image from 'next/image'
import React from 'react'

function AgentDetails({ listingDetails }) {
    return (
        <div>
            <Image
                alt="profileImage"
                width={100}
                height={100}
                className="rounded-full"
            />
            {/* <h2 className='font-bold'>{listingDetails.name}</h2>
            <p>{listingDetails.email}</p>
            <p>{listingDetails.phoneNumber}</p> */}
        </div>
    )
}

export default AgentDetails