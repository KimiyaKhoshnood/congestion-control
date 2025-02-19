import React from 'react'
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { IoPersonCircleSharp } from 'react-icons/io5';

interface DataType {
  key: React.Key;
  courtyard__name: string;
  latest_people: number|"null";
  latest_density: number|"null";
  camera_count: number|"null";
  details: string
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'نام صحن',
    dataIndex: 'courtyard__name',
  },
  {
    title: 'تخمین تعداد حاضران',
    dataIndex: 'latest_people',
  },
  {
    title: 'میزان ازدحام',
    dataIndex: 'latest_density',
  },
  {
    title: 'تعداد دوربین ها',
    dataIndex: 'camera_count',
  },
  {
    title: 'جزئیات',
    dataIndex: 'details',
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

async function getTable() {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/crowd/summary/`);
      console.log(response);
      
      return response.data; // داده رو برمی‌گردونه
    } catch (error: unknown) {
      console.error("خطا در دریافت داده:", error);
      return null; // در صورت خطا مقدار null برمی‌گردونه
    }
  }

const dashboard = async() => {  
    const dataTopic = await getTopic()
    
    const dataRawTable = await getTable()
    const dataTable:DataType[] = []

    dataRawTable.results.map((elem:DataType,i:number)=>{
     dataTable.push({
      key: i,
      courtyard__name: elem.courtyard__name,
      latest_people: elem.latest_people||"null",
      latest_density: elem.latest_density||"null",
      camera_count: elem.camera_count||"null",
      details: "More"
     })
    })
    
  return (
    <div className='w-full flex flex-col'>
      <div className='pr-5'>
        <div className='bg-[#EBFFF1]/80 p-10 flex justify-between items-end'>
          <div className='flex gap-5'>
            <div className='flex flex-col'>
              <span className='text-base'>آخرین گزارش</span>
              <span className='text-2xl'>{dataTopic.latest_date_of_report || "-"}</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-base'>تخمین کل حاضران</span>
              <span className='text-2xl'>{dataTopic.total_people_today}</span>
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
          <Table<DataType> className="transparent-table custom-transparent-table" columns={columns} dataSource={dataTable} size="small" pagination={{ pageSize: 5 }}  />
          <div><Link href={"http://127.0.0.1:8000/api/crowd/process-crowd/"} className='bg-[#5D9760] px-6 py-2 text-white hover:bg-[#37693a]'>تخمین</Link></div>
        </div>
      </div>
    </div>
  )
}

export default dashboard