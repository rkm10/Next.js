"use client"
import React from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

function EditListing() {
    return (
        <div className='mt-28 px-10 md:px-20'>
            <h2 className='text-xl font-bold'>Enter some more details about property</h2>
            <div className='p-8 rounded-lg shadow-md'>
                <div className='grid grid-cols-1 md:grid-cols-3'>
                    <h2>Rent or Sell</h2>
                </div>
            </div>
        </div>
    )
}

export default EditListing