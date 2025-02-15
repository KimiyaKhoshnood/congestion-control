"use client"
import React from 'react';
import { Button, Checkbox, Form, FormProps, Input } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';


const AddCamera: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter()

  const onFinish: FormProps['onFinish'] = async (values) => {
    console.log('Success:', values);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/cameras/",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false, // اگر کوکی برای احراز هویت استفاده می‌شود
        }
      );
  
      console.log("successful:", response);
      toast.success("اضافه شد!", { position: "bottom-right" });
      router.replace("/cameras")
    } catch (err:unknown) {
      toast.error("خطا!", { position: "bottom-right" });
      console.error("failed:", err);
    }
  };

  return (
    <div className='w-full h-full flex justify-center items-center'>
    <div className='bg-[#EBFFF1]/80 px-10 py-28 flex items-end justify-end'>

    <Form
          form={form}
          name="dependencies"
          autoComplete="off"
          className='flex flex-col items-end'
          onFinish={onFinish}
          initialValues={{ is_working: false }} 
        >
          <Form.Item className='' label="صحن" name="courtyard" rules={[{ required: true , message: 'این قسمت اجباری است!' }]}>
            <Input type='number' dir='ltr' placeholder='' className='w-[250px]'/>
          </Form.Item>
    
          <Form.Item className='' label="rstp_link" name="rstp_link" rules={[{ required: true , message: 'این قسمت اجباری است!' }]}>
            <Input dir='ltr' placeholder='' className='w-[250px]'/>
          </Form.Item>

          <Form.Item label="وضعیت"  name="is_working" valuePropName="checked" className=''>
            <Checkbox >درحال کار</Checkbox>
          </Form.Item>
    
          <Form.Item className='flex justify-center w-full'>
            <Button type="primary" htmlType="submit" className='bg-[#5D9760] px-6 '>
              اعمال تغییر
            </Button>
          </Form.Item>
        </Form>
    </div>
    <ToastContainer />
    </div>
  );
};

export default AddCamera;