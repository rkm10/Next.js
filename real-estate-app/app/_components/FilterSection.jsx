import React from 'react';
//Select shadcn
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/select';
import { BedDouble } from 'lucide-react';

function FilterSection() {
    return (
        <div className='px-3 py-2'>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Bed" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="2"><h2 className='flex gap-2'> <BedDouble className='h-4 w-4 text-primary' />2+</h2></SelectItem>
                    <SelectItem value="3"><h2 className='flex gap-2'> <BedDouble className='h-4 w-4 text-primary' />3+</h2></SelectItem>
                    <SelectItem value="4"><h2 className='flex gap-2'> <BedDouble className='h-4 w-4 text-primary' />4+</h2></SelectItem>
                    <SelectItem value="5"><h2 className='flex gap-2'> <BedDouble className='h-4 w-4 text-primary' />5+</h2></SelectItem>
                </SelectContent>
            </Select>

        </div>
    )
}

export default FilterSection