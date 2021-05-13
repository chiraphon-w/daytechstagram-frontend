import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
const { Text, Link } = Typography;
interface SignFormProps {
  pageType: string;
}
const SignForm: React.FC<SignFormProps> = ({ pageType }) => {
  const tailLayout = {
    wrapperCol: { offset: 8, span: 6 },
  };

  const onFinish = (values: { password: string; cfpassword: string }) => {
    console.log('Success:', values);
  };

  return (
    <>
      <div className='text-gray-500 text-lg'>{pageType === 'signin' ? 'Sign In' : 'Sign Up'}</div>
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
            prefix={<LockOutlined className='site-form-item-icon pt-3' />}
          />
        </Form.Item>
        <Form.Item style={{ marginTop: '0px' }}>
          <Text type='secondary'>Use at least 8 characters</Text>
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Button type='link'>Forgot password</Button>
          {/* <Link href='/forget-password'>Forgot password</Link> */}
        </Form.Item>
        <Form.Item>
          <div className='flex flex-row'>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              {pageType === 'signin'? 'Login' : 'SignUp'}
            </Button>
            <div className='pl-5 pt-1'>
              {pageType === 'signin' ? (
                <>
                  Don't have an account yet?  <Link href='/signup'>Register now!</Link>
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

export default SignForm;
