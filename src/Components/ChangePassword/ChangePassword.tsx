"use client"
import React from 'react'
import { Button, Form, FormProps, Input } from 'antd';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

type FieldType = {
  old_password?: string;
  new_password?: string;
  confirm_new_password?: string;
};


const ChangePassword: React.FC = () => {

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);

    const token = localStorage.getItem("authToken")

    console.log(token);
    

    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/auth/change-password/",
        {old_password: values.old_password, new_password: values.new_password, confirm_new_password: values.confirm_new_password},
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Token ${token}`
          },
          withCredentials: false, // اگر کوکی برای احراز هویت استفاده می‌شود
        }
      );
  
      console.log("successful:", response);
      toast.success("رمز عبور تغییر کرد!", { position: "bottom-right" });

    } catch (err: unknown) {
      toast.error("خطا!", { position: "bottom-right" });
      console.error("failed:", err);
    }
  };


  const [form] = Form.useForm();
  return (
    <>
    <Form
      form={form}
      name="dependencies"
      autoComplete="off"
      className='flex flex-col items-end'
      onFinish={onFinish}
    >
      <Form.Item className='' label="رمزعبور گذشته" name="old_password" rules={[{ required: true , message: 'این قسمت اجباری است!' }]}>
        <Input dir='ltr' placeholder='Old Password' className='w-[250px]'/>
      </Form.Item>

      <Form.Item className='' label="رمزعبور جدید" name="new_password" rules={[{ required: true , message: 'این قسمت اجباری است!' }]}>
        <Input dir='ltr' placeholder='New password' className='w-[250px]'/>
      </Form.Item>

      {/* Field */}
      <Form.Item
        label="تایید رمزعبور جدید"
        name="confirm_new_password"
        dependencies={['new_password']}
        rules={[
          {
            required: true, message: 'این قسمت اجباری است!' 
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('new_password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('تطابق ندارند'));
            },
          }),
        ]}
      >
        <Input dir='ltr' placeholder='Confirm New Password' className='w-[250px]'/>
      </Form.Item>

      <Form.Item className='flex justify-center w-full'>
        <Button type="primary" htmlType="submit" className='bg-[#5D9760] px-6 '>
          اعمال تغییر
        </Button>
      </Form.Item>

      {/* Render Props */}
      {/* <Form.Item noStyle dependencies={['password2']}>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item> */}
    </Form>
    <ToastContainer />
    </>
  );
};

export default ChangePassword;
