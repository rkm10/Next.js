"use client"
import React, { useEffect } from 'react'
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../../../../components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../components/ui/select";
import { Formik } from 'formik';
import { Button } from '../../../../components/ui/button';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { supabase } from '../../../../utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import FileUpload from '../_components/FileUpload';


function EditListing({ params }) {

    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        console.log("id", params.id)
        user && verifyUserRecord();
    }, [user])

    const verifyUserRecord = async () => {
        const { data, error } = await supabase
            .from('listing')
            .select('*')
            .eq('createdBy', user?.primaryEmailAddress.emailAddress)
            .eq('id', params.id)

        if (data?.length <= 0) {
            router.replace('/')
        }
    }

    const onSubmitHandler = async (formValue) => {
        const { data, error } = await supabase
            .from('listing')
            .update(formValue)
            .eq('id', params.id)
            .select();

        if (data) {
            console.log('final=============================', data);
            toast('Listing Updated and Published Successfully')
        }

    }

    return (
        <div className='mt-28 px-10 md:px-20'>
            <h2 className='text-xl font-bold'>Enter some more details about property</h2>
            <Formik initialValues={{
                profileImage: user?.imageUrl,
                fullName: user?.fullName,
            }}
                onSubmit={(values) => {
                    console.log(values)
                    onSubmitHandler(values)
                }}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className='p-8 rounded-lg shadow-md flex flex-col gap-10'>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-lg font-medium text-slate-500'>Rent or Sell</h2>
                                    <RadioGroup defaultValue="Sell"
                                        onValueChange={(e) => values.type = e}>
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
                                    <Select onValueChange={(e) => values.propertyType = e} name='propertyType'>
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
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-lg font-medium text-slate-500'>Bedrooms</h2>
                                    <Input type="number" placeholder="Ex.2" name="bedroom" onChange={handleChange} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-lg font-medium text-slate-500'>Bathroom</h2>
                                    <Input type="number" placeholder="Ex.2" name="bathroom" onChange={handleChange} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-lg font-medium text-slate-500'>Built In</h2>
                                    <Input type="number" placeholder="Ex.1900 Sq.ft" name="builtIn" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-lg font-medium text-slate-500'>Parking</h2>
                                    <Input type="number" placeholder="Ex.2" name="parking" onChange={handleChange} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-lg font-medium text-slate-500'>Lot Size (Sq.Ft)</h2>
                                    <Input type="number" placeholder="" name="lotSize" onChange={handleChange} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-lg font-medium text-slate-500'>Area</h2>
                                    <Input type="number" placeholder="Ex.1800 Sq.ft" name="area" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-lg font-medium text-slate-500'>Selling Price ($)</h2>
                                    <Input type="number" placeholder="400000" name="price" onChange={handleChange} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-lg font-medium text-slate-500'>HOA (Per Month) ($)</h2>
                                    <Input type="number" placeholder="100" name="hoa" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 gap-10'>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-gray-500'>Description</h2>
                                    <Textarea placeholder="" name="description" onChange={handleChange} />
                                </div>
                                <h2 className='text-lg font-medium text-slate-500'>Upload Property Images</h2>
                                <FileUpload />
                            </div>
                            <div className='flex justify-end gap-7'>
                                <Button variant="outline" className="text-primary border-primary"> Save </Button>
                                <Button className="">Save & Publish</Button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default EditListing