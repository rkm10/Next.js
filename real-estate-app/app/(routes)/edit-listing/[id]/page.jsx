"use client"
import React, { useEffect, useState } from 'react'
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../../../../components/ui/radio-group";
//Select shadcn
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../components/ui/select";

//Alert Dialog shadcn
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog"

import { Formik } from 'formik';
import { Button } from '../../../../components/ui/button';
import { toast } from 'sonner';
import { supabase } from '../../../../utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import FileUpload from '../_components/FileUpload';
import { Loader2 } from 'lucide-react';


function EditListing({ params }) {

    const { user } = useUser();
    const router = useRouter();
    const [images, setImages] = useState([]);
    const [listing, setListing] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("id", params.id)
        user && verifyUserRecord();
    }, [user])

    const verifyUserRecord = async () => {
        const { data, error } = await supabase
            .from('listing')
            .select('*,listingImages(listing_id,url)')
            .eq('createdBy', user?.primaryEmailAddress.emailAddress)
            .eq('id', params.id);

        if (data) {
            console.log(data);
            setListing(data[0])
        }

        if (data?.length <= 0) {
            router.replace('/')
        }
    }

    const onSubmitHandler = async (formValue) => {
        setLoading(true)
        const { data, error } = await supabase
            .from('listing')
            .update(formValue)
            .eq('id', params.id)
            .select();

        if (data) {
            console.log('final=============================', data);
            toast('Listing Updated and Published Successfully')
            setLoading(false)
        }
        for (const image of images) {
            setLoading(true)
            const file = image;
            const fileName = Date.now().toString();
            const fileExt = fileName.split('.').pop();
            const { data, error } = await supabase.storage
                .from('listingImages')
                .upload(`${fileName}`, file, {
                    contentType: `image/${fileExt}`,
                    upsert: false //update existing file if exists make TRUE.
                });

            if (error) {
                setLoading(false)
                toast('Error while uploading images')
            }
            else {
                const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL + fileName
                const { data, error } = await supabase
                    .from('listingImages')
                    .insert([
                        { url: imageURL, listing_id: params.id }
                    ])
                    .select();
                if (data) {
                    setLoading(false)
                }

                if (error) {
                    setLoading(false)
                }
            }
            setLoading(false)
        }

    }

    const publishBtnhandler = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('listing')
            .update({ active: 'true' })
            .eq('id', params.id)
            .select()
        if (data) {
            setLoading(false)
            toast('Listing Published Successfully')
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
                                    <RadioGroup
                                        onValueChange={(e) => values.type = e}
                                    >
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
                                    <Select onValueChange={(e) => values.propertyType = e}
                                        name='propertyType'
                                        defaultValue={listing?.propertyType}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder={listing?.propertyType ? listing?.propertyType : "Select Property Type"} />
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
                                    <Input type="number" placeholder="Ex.2" name="bedroom" defaultValue={listing?.bedroom} onChange={handleChange} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-lg font-medium text-slate-500'>Bathroom</h2>
                                    <Input type="number" placeholder="Ex.2" name="bathroom" defaultValue={listing?.bathroom} onChange={handleChange} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-lg font-medium text-slate-500'>Built In</h2>
                                    <Input type="number" placeholder="Ex.1900 Sq.ft" name="builtIn" defaultValue={listing?.builtin} onChange={handleChange} />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-lg font-medium text-slate-500'>Parking</h2>
                                    <Input type="number" placeholder="Ex.2" name="parking" defaultValue={listing?.parking} onChange={handleChange} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-lg font-medium text-slate-500'>Lot Size (Sq.Ft)</h2>
                                    <Input type="number" placeholder="" name="lotSize" defaultValue={listing?.lotSize} onChange={handleChange} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-lg font-medium text-slate-500'>Area</h2>
                                    <Input type="number" placeholder="Ex.1800 Sq.ft" name="area" defaultValue={listing?.area} onChange={handleChange} />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-lg font-medium text-slate-500'>Selling Price ($)</h2>
                                    <Input type="number" placeholder="400000" name="price" defaultValue={listing?.price} onChange={handleChange} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-lg font-medium text-slate-500'>HOA (Per Month) ($)</h2>
                                    <Input type="number" placeholder="100" name="hoa" defaultValue={listing?.hoa} onChange={handleChange} />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 gap-10'>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-gray-500'>Description</h2>
                                    <Textarea placeholder="" name="description" defaultValue={listing?.description} onChange={handleChange} />
                                </div>
                                <h2 className='text-lg font-medium text-slate-500'>Upload Property Images</h2>
                                <FileUpload setImages={(value) => setImages(value)}
                                    imageList={listing.listingImages}
                                />
                            </div>
                            <div className='flex justify-end gap-7'>
                                <Button disabled={loading} variant='outline' className="">
                                    {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : 'save'}</Button>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button type="button" disabled={loading} className="">
                                            {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : 'Save & Publish'}</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Ready to Publish?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Do you really want to publish the listing?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => publishBtnhandler()}>
                                                {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : 'Publish'}
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default EditListing