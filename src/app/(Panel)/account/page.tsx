import ChangePassword from '@/Components/ChangePassword/ChangePassword'
import React from 'react'
import { IoPersonCircleSharp } from "react-icons/io5";


const account = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='bg-[#EBFFF1]/80 rounded-2xl h-[80%]'>
      <div className='bg-gradient-to-t from-white/20 to-black/20 flex flex-col gap-5 items-center justify-center px-10 rounded-2xl h-full'>
        <div className='w-[138px] h-[138px] rounded-full bg-gray-200'>
        <IoPersonCircleSharp className='w-[138px] h-[138px] text-gray-700'/>
        </div>
        <h1 className='text-3xl'>سیستم کنترل ازدحام</h1>
        <ChangePassword/>
      </div>
      </div>
    </div>
  )
}

export default account