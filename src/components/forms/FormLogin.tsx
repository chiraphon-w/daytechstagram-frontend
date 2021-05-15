import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import router, { useRouter } from 'next/router';
import axios from 'axios';
import { authAxios } from 'src/pages/api/daytechbackend';
import { useRecoilState } from 'recoil';
import { userLoginState } from '../recoil/atom';

const { Text } = Typography;
interface FormLoginProps {
  pageType: string;
}
const cookieCutter = require('cookie-cutter');

const FormLogin: React.FC<FormLoginProps> = ({ pageType }) => {
  const [userToken, setUserToken] = useRecoilState(userLoginState);
  const route = useRouter();
  const [form] = Form.useForm();
  const tailLayout = {
    wrapperCol: { offset: 9, span: 7 },
  };
  // : Promise<boolean>

  const onFinish = async (values: any): Promise<boolean | undefined> => {
    if (pageType === 'signup') {
      try {
        const params = new URLSearchParams();
        params.append('username', values.username);
        params.append('password', values.password);

        await authAxios.post('/users/signup', params);
        return router.push('/signin');
      } catch (e) {
        console.log('e', e.response);
        if (e.response.data.statusCode == 409) {
          alert('username is already exits');
        } else if (e.response.data.statusCode == 400) {
          alert('password is to week');
        }
      }
    } else {
      try {
        const params = new URLSearchParams();
        params.append('username', values.username);
        params.append('password', values.password);

        const { data } = await authAxios.post('/users/signin', params);
        console.log(data);
        cookieCutter.set('jwt', data.token);
        return router.push('/posts');
      } catch (e) {
        if (e.response.data.statusCode == 401) {
          alert('Invalid username or password');
          form.resetFields();
        }
      }
    }

    console.log('Success:', values);
    if (pageType === 'signin') {
    } else {
      return route.push('/signin');
    }
  };

  return (
    <>
      <div className='text-gray-500 text-lg text-center p-10 pr-10'>
        {pageType === 'signin' ? 'Sign In' : 'Sign Up'}
      </div>

      <Form
        {...tailLayout}
        form={form}
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
          <div className='flex flex-row'>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              {pageType === 'signin' ? 'Login' : 'SignUp'}
            </Button>
            <div className='pl-5 pt-1'>
              {pageType === 'signin' ? (
                <>
                  Don't have an account yet?
                  <Link shallow={true} href='/signup'>
                    Register now!
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?
                  <Link shallow={true} href='/signin'>
                    Sign In
                  </Link>
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
