'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Header() {
    const path = usePathname();
    useEffect(() => {
        console.log(path);
    }, [])

    return (
        <div className='flex justify-between p-6 px-10 shadow-sm fixed top-0 w-full z-10 bg-slate-700'>
            <div className='flex gap-12 items-center'>
                <Image src="/logo.svg" alt="Dummy Logo" width={150} height={150} priority />
                <ul className='hidden md:flex gap-10'>
                    {/* // hidden for small screen */}
                    <Link href={'/'}><li className={`'hover:text-primary font-medium text-sm cursor-pointer text-slate-100' ${path === '/' ? 'text-primary' : 'text-slate-100'} `}> Buy</li></Link>
                    <li className='hover:text-primary font-medium text-sm cursor-pointer text-slate-100'>Sell</li>
                    <li className='hover:text-primary font-medium text-sm cursor-pointer text-slate-100'>Agent</li>
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