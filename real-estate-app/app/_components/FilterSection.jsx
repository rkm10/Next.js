import React from 'react';
//Select shadcn
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/select';
import { Bath, BedDouble, CarFront } from 'lucide-react';

function FilterSection({ setBedCount, setBathCount, setParkingCount, setHomeType }) {
    return (
        <div className='px-3 py-2 grid grid-cols-2 md:flex gap-2'>
            <Select onValueChange={setBedCount}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Bedroom" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="2"><h2 className='flex gap-2'> <BedDouble className='h-4 w-4 text-primary' />2+</h2></SelectItem>
                    <SelectItem value="3"><h2 className='flex gap-2'> <BedDouble className='h-4 w-4 text-primary' />3+</h2></SelectItem>
                    <SelectItem value="4"><h2 className='flex gap-2'> <BedDouble className='h-4 w-4 text-primary' />4+</h2></SelectItem>
                    <SelectItem value="5"><h2 className='flex gap-2'> <BedDouble className='h-4 w-4 text-primary' />5+</h2></SelectItem>
                </SelectContent>
            </Select>

            <Select onValueChange={setBathCount}>
                <SelectTrigger className="w-[150px] md:w-[180px]">
                    <SelectValue placeholder="Bathroom" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="2"><h2 className='flex gap-2'> <Bath className='h-4 w-4 text-primary' />2+</h2></SelectItem>
                    <SelectItem value="3"><h2 className='flex gap-2'> <Bath className='h-4 w-4 text-primary' />3+</h2></SelectItem>
                    <SelectItem value="4"><h2 className='flex gap-2'> <Bath className='h-4 w-4 text-primary' />4+</h2></SelectItem>
                    <SelectItem value="5"><h2 className='flex gap-2'> <Bath className='h-4 w-4 text-primary' />5+</h2></SelectItem>
                </SelectContent>
            </Select>

            <Select onValueChange={setParkingCount}>
                <SelectTrigger className="w-[150px] md:w-[180px]">
                    <SelectValue placeholder="Parking" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1"><h2 className='flex gap-2'> <CarFront className='h-4 w-4 text-primary' />1+</h2></SelectItem>
                    <SelectItem value="2"><h2 className='flex gap-2'> <CarFront className='h-4 w-4 text-primary' />2+</h2></SelectItem>
                    <SelectItem value="3"><h2 className='flex gap-2'> <CarFront className='h-4 w-4 text-primary' />3+</h2></SelectItem>
                    <SelectItem value="4"><h2 className='flex gap-2'> <CarFront className='h-4 w-4 text-primary' />4+</h2></SelectItem>
                    <SelectItem value="5"><h2 className='flex gap-2'> <CarFront className='h-4 w-4 text-primary' />5+</h2></SelectItem>
                </SelectContent>
            </Select>

            <Select onValueChange={(value) => value === "All" ? setHomeType(null) : setHomeType}>
                <SelectTrigger className="w-[150px] md:w-[180px]">
                    <SelectValue placeholder="Home Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All"><h2 className='flex gap-2'> All</h2></SelectItem>
                    <SelectItem value="Single Family Home"><h2 className='flex gap-2'> Single Family Home</h2></SelectItem>
                    <SelectItem value="Town House"><h2 className='flex gap-2'> Town House</h2></SelectItem>
                    <SelectItem value="Condo"><h2 className='flex gap-2'> Condo</h2></SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default FilterSection