"use client"
import React from 'react'
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};


const LoginForm = () => {
  const router = useRouter()


  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/login/",
        {username: values.username, password: values.password},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false, // اگر کوکی برای احراز هویت استفاده می‌شود
        }
      );
  
      console.log("Login successful:", response);
      toast.success("خوش آمدید!", { position: "bottom-right" });
      localStorage.setItem("authToken", response?.data?.token);
      router.replace("/dashboard")
      // می‌توانی توکن را در localStorage ذخیره کنی یا کاربر را به صفحه دیگری هدایت کنی
    } catch (err: unknown) {
      toast.error("ارور!", { position: "bottom-right" });
      console.error("Login failed:", err);
    }
  };




  return (
    <>
    <Form
    className='w-full'
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      name="username"
      rules={[{ required: true, message: 'لطفا شناسه خود را وارد کنید!' }]}
      
    >
      <Input placeholder='شناسه' className='text-sm py-2 w-60'/>
    </Form.Item>

    <Form.Item<FieldType>
      name="password"
      rules={[{ required: true, message: 'لطفا رمزعبور خود را وارد کنید!' }]}
    >
      <Input.Password placeholder='رمز عبور' className='text-sm py-2 w-60'/>
    </Form.Item>

    <Form.Item className='flex justify-center'>
      <Button type="primary" htmlType="submit" className='bg-[#5D9760] px-6 '>
        ورود
      </Button>
    </Form.Item>
  </Form>
  <ToastContainer />
    </>
  )
}

export default LoginForm