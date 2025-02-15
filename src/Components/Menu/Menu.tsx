import Link from 'next/link';
import React from 'react'
import { IoIosArrowDown } from "react-icons/io";


const items = [
  {
    key: '1',
    link: 'dashboard',
    label: 'صفحه اصلی',
  },
  {
    key: '2',
    link: 'dashboard',
    label: 'گزارشات',
  },
  {
    key: '3',
    link: 'cameras',
    label: 'دوربین ها',
  },
  {
    key: '3',
    link: 'account',
    label: 'حساب کاربری',
  },
];


const Menu: React.FC = () => {
  return (
    <div className='bg-[#EBFFF1] w-[208px] h-full'>
        {
            items.map((item, index) => (
                <Link href={`/${item.link}`} key={index} className='flex justify-between items-center px-4 py-2 border-b border'>
                    <span>{item.label}</span>
                    <IoIosArrowDown/>
                </Link>
            ))
        }
    </div>
  )
}

export default Menu