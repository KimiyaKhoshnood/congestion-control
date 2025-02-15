import Image from 'next/image'
import React from 'react'
import Logo from "../../../public/Logo.png"
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoLanguage } from "react-icons/io5";


const Header = () => {
  return (
    <div className='bg-[#5D9760] flex justify-between items-center px-5'>
        <div className='flex items-center gap-2'>
            <IoLanguage className='w-5 h-5 text-white' />
            <span className='text-white'>مدیریت</span>
            <IoPersonCircleSharp className='w-10 h-10 text-white'/>
        </div>
        <div className='flex items-center'>
            <span className='text-white'>سیستم کنترل ازدحام</span>
            <Image src={Logo} alt='' height={48}/>
        </div>
    </div>
  )
}

export default Header