"use client"
import { UserButton } from '@clerk/nextjs'

import Image from 'next/image'
import React, { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function Header() {

  const Router = useRouter();
  const path = usePathname();
  useEffect(() => {
  
  })

  return (
    <div className='flex p-2 items-center justify-between bg-secondary shadow-sm'>
      <Image src={'/logo.svg'} width={120} height={60} alt='logo'/>
      <ul className=' hidden md:flex gap-6'>
        <li onClick={()=>Router.replace('/dashboard')} className={`hover: hover:font-bold transition-all cursor-pointer ${path === '/dashboard' ? 'font-bold' : ''}`}>Dashboard</li>
        <li className={`hover: hover:font-bold transition-all cursor-pointer ${path === '/forum' ? 'font-bold' : ''}`}>Question</li>
        <li className={`hover: hover:font-bold transition-all cursor-pointer ${path === '/upgrade' ? 'font-bold' : ''}`}>Upgrade</li>
        <li className={`hover: hover:font-bold transition-all cursor-pointer ${path === '/how-it-works' ? 'font-bold' : ''}`}>How it Works?</li>
      </ul>
      <UserButton></UserButton>
    </div>
  )
}
