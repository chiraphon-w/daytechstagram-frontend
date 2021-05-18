import { Button, Layout, Menu } from 'antd';
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import { useRecoilState } from 'recoil';
import { userLoginState } from '../recoil/atom';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { MainLayoutProps } from '../types';

const { Footer } = Layout;

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [userToken, setUserToken] = useRecoilState(userLoginState);
  const route = useRouter();

  const handleLogout = () => {
    Cookies.remove('jwt');
    setUserToken(false);
    return route.push('/signin');
  };

  return (
    <>
      <div>
        <Disclosure as='nav' className='bg-gray-800'>
          <>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='flex items-center justify-between h-16'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <img
                      className='h-8 w-8'
                      src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                      alt='Workflow'
                    />
                  </div>
                  <div className='hidden md:block'>
                    <div className='ml-10 flex items-baseline space-x-4'>
                      {userToken === false ? (
                        <Menu
                          className='bg-gray-800'
                          mode='horizontal'
                          defaultSelectedKeys={['1']}
                        >
                          <Menu.Item key='1'>
                            <Button type='link'>
                              <Link href='/signin'>
                                Home
                              </Link>
                            </Button>
                          </Menu.Item>
                        </Menu>
                      ) : (
                        <Menu
                          className='bg-gray-800'
                          mode='horizontal'
                          defaultSelectedKeys={['2']}
                        >
                          <Menu.Item key='2'>
                            <Button type='link'>
                              <Link href='/posts'>
                                Home
                              </Link>
                            </Button>
                          </Menu.Item>
                          <Menu.Item key='3'>
                            <Button type='link' onClick={handleLogout}>
                              Logout
                            </Button>
                          </Menu.Item>
                        </Menu>
                      )}
                    </div>
                  </div>
                </div>
                <div className='hidden md:block'>
                  <div className='ml-4 flex items-center md:ml-6'></div>
                </div>
              </div>
            </div>
          </>
        </Disclosure>
        <header className='bg-white shadow'>
          <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
            <h1 className='text-3xl font-bold text-gray-900'>
              Daytech Stagram
            </h1>
          </div>
        </header>
        <main>
          <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
            <div className='px-4 py-6 sm:px-0'>
              <div className='border-4 border-dashed border-gray-200 rounded-lg h-full'>
                {children}
              </div>
            </div>
          </div>
          <Footer className='bg-white' style={{ textAlign: 'center' }}>
            Daytechstagram ©2020 Created by Apple
          </Footer>
        </main>
      </div>
    </>
  );
};

export default MainLayout;
