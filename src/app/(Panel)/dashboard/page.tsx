import React from 'react'
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { IoPersonCircleSharp } from 'react-icons/io5';

interface DataType {
  key: React.Key;
  name: string;
  presents: number;
  crowd: number;
  cameras: number;
  details: string
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'نام صحن',
    dataIndex: 'name',
  },
  {
    title: 'تخمین تعداد حاضران',
    dataIndex: 'presents',
  },
  {
    title: 'میزان ازدحام',
    dataIndex: 'crowd',
  },
  {
    title: 'تعداد دوربین ها',
    dataIndex: 'cameras',
  },
  {
    title: 'جزئیات',
    dataIndex: 'details',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    presents: 32,
    crowd: 1,
    cameras: 1,
    details: "More"
  },
  {
    key: '2',
    name: 'Jim Green',
    presents: 42,
    crowd: 1,
    cameras: 1,
    details: "More"
  },
  {
    key: '3',
    name: 'Joe Black',
    presents: 32,
    crowd: 1,
    cameras: 1,
    details: "More"
  },
  {
    key: '4',
    name: 'Joe Black',
    presents: 32,
    crowd: 1,
    cameras: 1,
    details: "More"
  },
  {
    key: '5',
    name: 'Joe Black',
    presents: 32,
    crowd: 1,
    cameras: 1,
    details: "More"
  },
  {
    key: '6',
    name: 'Joe Black',
    presents: 32,
    crowd: 1,
    cameras: 1,
    details: "More"
  },
  {
    key: '7',
    name: 'Joe Black',
    presents: 32,
    crowd: 1,
    cameras: 1,
    details: "More"
  },
  {
    key: '8',
    name: 'Joe Black',
    presents: 32,
    crowd: 1,
    cameras: 1,
    details: "More"
  },
  {
    key: '9',
    name: 'Joe Black',
    presents: 32,
    crowd: 1,
    cameras: 1,
    details: "More"
  },
];

async function getTopic() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/crowd/latest-summary");
      return response.data; // داده رو برمی‌گردونه
    } catch (error: unknown) {
      console.error("خطا در دریافت داده:", error);
      return null; // در صورت خطا مقدار null برمی‌گردونه
    }
  }

async function getLatestSummary() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/crowd/summary");
      return response.data; // داده رو برمی‌گردونه
    } catch (error: unknown) {
      console.error("خطا در دریافت داده:", error);
      return null; // در صورت خطا مقدار null برمی‌گردونه
    }
  }

const dashboard = async() => {  
  const data2 = await getTopic()
    const data1 = await getLatestSummary()
    console.log("data1", data1);
  return (
    <div className='w-full flex flex-col'>
      <div className='pr-5'>
        <div className='bg-[#EBFFF1]/80 p-10 flex justify-between items-end'>
          <div className='flex gap-5'>
            <div className='flex flex-col'>
              <span className='text-base'>آخرین گزارش</span>
              <span className='text-2xl'>{data2.latest_date_of_report || "-"}</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-base'>تخمین کل حاضران</span>
              <span className='text-2xl'>{data2.total_people_today}</span>
            </div>
          </div>
          <div>
            <span className='text-left'>Dashboard</span>
            <div className='flex gap-4'>
              <span className='text-lg py-2'>خوش آمدید</span>
              <div className='w-[72px] h-[72px] bg-[#94a499] rounded-full block'><IoPersonCircleSharp className='w-[72px] h-[72px] text-white'/></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className='p-10 w-full h-full flex'>
        <div className='bg-[#EBFFF1]/80 p-10 w-full'>
          <Table<DataType> className="transparent-table custom-transparent-table" columns={columns} dataSource={data} size="small" pagination={{ pageSize: 5 }}  />
          <div><Link href={"http://127.0.0.1:8000/api/crowd/process-crowd/"} className='bg-[#5D9760] px-6 py-2 text-white hover:bg-[#37693a]'>تخمین</Link></div>
        </div>
      </div>
    </div>
  )
}

export default dashboard