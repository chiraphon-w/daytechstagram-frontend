import { Form, Input, Button, Alert, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import router, { useRouter } from 'next/router';
import axios from 'axios';
import { authAxios } from 'src/pages/api/daytechbackend';
import { useRecoilState } from 'recoil';
import { errorState, userLoginState } from '../recoil/atom';

const { Text } = Typography;
interface FormLoginProps {
  pageType: string;
}
const cookieCutter = require('cookie-cutter');

const FormLogin: React.FC<FormLoginProps> = ({ pageType }) => {
  const [userToken, setUserToken] = useRecoilState(userLoginState);
  const [errorCode, setErrorCode] = useRecoilState(errorState);

  const route = useRouter();
  const [form] = Form.useForm();
  const tailLayout = {
    wrapperCol: { offset: 9, span: 7 },
  };

  const onFinish = async (values: any): Promise<boolean | undefined> => {
    if (pageType === 'signup') {
      try {
        const params = new URLSearchParams();
        params.append('username', values.username);
        params.append('password', values.password);

        await authAxios.post('/users/signup', params);
        return router.push('/signin');
      } catch (e) {
        // console.log('e', e.response);
        if (e.response.data.statusCode == 409) {
          // setErrorCode(409);
          alert('Username already exist!');
        } else if (e.response.data.statusCode == 400) {
          // setErrorCode(400);
          alert(
            "Make sure it's at least 4 characters including a number, a lowercase and a uppercase letter"
          );
        }
      }
    } else {
      try {
        const params = new URLSearchParams();
        params.append('username', values.username);
        params.append('password', values.password);

        const { data } = await authAxios.post('/users/signin', params);
        // console.log(data);
        cookieCutter.set('jwt', data.token);
        setUserToken(true);
        return router.push('/posts');
      } catch (e) {
        if (e.response.data.statusCode == 401) {
          // setErrorCode(401);
          alert('Invalid username or password');
          form.resetFields();
        }
      }
    }

    console.log('Success:', values);
    if (errorCode === 0) {
      // console.log(errorCode);
      if (pageType === 'signin') {
        // return route.push('/posts');
      } else {
        // setErrorCode(0);
        return route.push('/signin');
      }
    }
  };

  return (
    <>
      {/* {errorCode === 409 ? (
        <Alert
          message='Username already exist!'
          type='error'
          showIcon
          closable
        />
      ) : (
        <></>
      )}
      {errorCode === 401 ? (
        <Alert
          message='Invalid username or password'
          type='error'
          showIcon
          closable
        />
      ) : (
        <></>
      )}
      {errorCode === 400 ? (
        <Alert
          message="Make sure it's at least 4 characters including a number, a lowercase and a uppercase letter"
          type='error'
          showIcon
          closable
        />
      ) : (
        <></>
      )}
      {errorCode !== 400 && errorCode !== 409 && errorCode !== 0 ? (
        <Alert message='SUCCESS!' type='success' showIcon closable />
      ) : (
        <></>
      )} */}
      {/* (
        <Alert message='SUCCESS!' type='success' showIcon closable />
      )} */}

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
          {pageType === 'signup' ? (
            <Text type='secondary'>
              Use at least 4 characters including a number, a lowercase and a
              uppercase letter
            </Text>
          ) : (
            <></>
          )}
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
                  <Link shallow={true} href='/signup'>
                    Don't have an account yet?
                  </Link>
                </>
              ) : (
                <>
                  <Link shallow={true} href='/signin'>
                    Already have an account?
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
