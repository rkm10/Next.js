import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

function Header() {
    return (
        <div className='flex justify-between p-6 px-10 shadow-sm fixed top-0 w-full z-10 bg-slate-700'>
            <div className='flex gap-12 items-center'>
                <Image src="/logo.svg" alt="Dummy Logo" width={150} height={150} priority />
                <ul className='hidden md:flex gap-10'>
                    {/* // hidden for small screen */}
                    <li className='hover:text-primary font-medium text-sm cursor-pointer text-slate-100' > Home</li>
                    <li className='hover:text-primary font-medium text-sm cursor-pointer text-slate-100' >Buy</li>
                    <li className='hover:text-primary font-medium text-sm cursor-pointer text-slate-100' >Sell</li>
                </ul>
            </div>
            <div className='flex gap-2'>
                <Button><Plus className='h-4 w-4 mr-2' />Post Your Ad</Button>
                <Button variant='outline'>Login</Button>
            </div>
        </div>

    )
}

export default Header