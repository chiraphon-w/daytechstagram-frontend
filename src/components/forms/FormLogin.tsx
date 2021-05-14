import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
const { Text } = Typography;
interface FormLoginProps {
  pageType: string;
}
const FormLogin: React.FC<FormLoginProps> = ({ pageType }) => {
  const tailLayout = {
    wrapperCol: { offset: 9, span: 7 }
  };

  const onFinish = (values: { password: string; cfpassword: string }) => {
    console.log('Success:', values);
  };

  return (
    <>
      <div className='text-gray-500 text-lg text-center p-10 pr-10'>
        {pageType === 'signin' ? 'Sign In' : 'Sign Up'}
      </div>

      <Form
        {...tailLayout}
        name='normal_login'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name='username'
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Username'
          />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: '0px' }}
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            placeholder='Password'
            prefix={<LockOutlined className='site-form-item-icon' />}
          />
        </Form.Item>
        <Form.Item style={{ marginTop: '0px' }}>
          <Text type='secondary'>Use at least 8 characters</Text>
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Link href='/'>Forgot password</Link>
        </Form.Item>
        <Form.Item>
          <div className='flex flex-row'>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              onClick={() => {}}
            >
              {pageType === 'signin' ? <Link href='/posts'>Login</Link> : <Link href='/posts'>SignUp</Link>}
            </Button>
            <div className='pl-5 pt-1'>
              {pageType === 'signin' ? (
                <>
                  Don't have an account yet? <Link href='/signup'>Register now!</Link>
                </>
              ) : (
                <>
                  Already have an account? <Link href='/signin'>Sign In</Link>
                </>
              )}
            </div>
          </div>
        </Form.Item>
      </Form>
      
    </>
  );
};

export default FormLogin;
