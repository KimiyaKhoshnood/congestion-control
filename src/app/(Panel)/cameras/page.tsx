import React from 'react'
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import axios from 'axios';
import Link from 'next/link';

interface DataType {
  key: React.Key;
  courtyard_id: number
  courtyard_name?: string
  date_added: string
  id:number
  is_working: string
  rstp_link?: string
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'شناسه دوربین',
    dataIndex: 'id',
  },
  {
    title: 'تاریخ افزوده شدن به سیستم',
    dataIndex: 'date_added',
  },
  {
    title: 'شناسه صحن',
    dataIndex: 'courtyard_id',
  },
  {
    title: 'وضعیت',
    dataIndex: 'is_working',
  },
];

async function getCamera() {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/cameras/`);
    return response.data; // داده رو برمی‌گردونه
  } catch (error: unknown) {
    console.error("خطا در دریافت داده:", error);
    return null; // در صورت خطا مقدار null برمی‌گردونه
  }
}

const cameras = async() => {

  const dataRaw = await getCamera()
  const data:DataType[] = []
  dataRaw.results.map((elem:DataType,i:number)=>{
    data.push({
      key: i,
      courtyard_id: elem.courtyard_id,
      date_added: elem.date_added,
      id: elem.id,
      is_working: elem.is_working?"درحال کار":"نیازمند تعمیر",
    })
  })
  


  return (
    <div className='px-10 py-5 w-full h-full flex'>
        <div className='bg-[#EBFFF1]/80 px-10 py-5 w-full flex flex-col gap-3'>
          <div className='flex justify-end'>
            <Link href={"/add-camera"} className='bg-[#5D9760] px-6 py-2 text-white hover:bg-[#37693a]'>افزودن دوربین</Link>
          </div>
          <Table<DataType> className="transparent-table custom-transparent-table" columns={columns} dataSource={data} size="small" pagination={{ pageSize: 10 }} />
        </div>
      </div>
  )
}

export default cameras