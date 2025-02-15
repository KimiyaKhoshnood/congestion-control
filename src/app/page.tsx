import LoginForm from '@/Components/LoginForm/LoginForm'
import React from 'react'

const login = () => {

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='bg-[#EBFFF1]/80 rounded-2xl h-[70%]'>
      <div className='bg-gradient-to-t from-white/20 to-black/20 flex flex-col gap-5 items-center justify-center px-10 rounded-2xl h-full'>
        <h1 className='text-4xl'>سیستم کنترل ازدحام</h1>
        <h2 className='text-2xl'>ورود به سیستم</h2>
        <LoginForm/>
      </div>
      </div>
    </div>
  )
}

export default login