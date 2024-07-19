"use client"
import React from 'react'
import { Label } from "../../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../../components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../components/ui/select";


function EditListing() {
    return (
        <div className='mt-28 px-10 md:px-20'>
            <h2 className='text-xl font-bold'>Enter some more details about property</h2>
            <div className='p-8 rounded-lg shadow-md'>
                <div className='grid grid-cols-1 md:grid-cols-3'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-lg font-medium text-slate-500'>Rent or Sell</h2>
                        <RadioGroup defaultValue="Sell">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Rent" id="Rent" />
                                <Label htmlFor="Rent">Rent</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Sell" id="Sell" />
                                <Label htmlFor="Sell">Sell</Label>
                            </div>
                        </RadioGroup>

                    </div>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-lg font-medium text-slate-500'>Property Type</h2>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Property Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Single Family House">Single Family House</SelectItem>
                                <SelectItem value="Town House">Town House</SelectItem>
                                <SelectItem value="Condominium">Condominium</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditListing