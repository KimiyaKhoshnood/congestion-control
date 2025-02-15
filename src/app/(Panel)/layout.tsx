import Header from '@/Components/Header/Header';
import Menu from '@/Components/Menu/Menu';
import React from 'react'

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className='h-screen flex flex-col'>
        <Header/>
        <div className='h-full flex w-full'>
            <Menu/>
            {children}    
        </div>
    </div>
  )
}

export default layout