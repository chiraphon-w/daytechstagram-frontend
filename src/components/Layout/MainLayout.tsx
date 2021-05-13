import {
  Button,
  DatePicker,
  Typography,
  version,
  Layout,
  Menu,
  Breadcrumb,
} from 'antd';
import Link from 'next/link';
import { ReactNode } from 'react';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
interface MainLayoutProps {
  children: JSX.Element & ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Layout className='layout'>
        <Menu theme='light' mode='horizontal' defaultSelectedKeys={['2']}>
          <Menu.Item key='1'>Home</Menu.Item>
          <Menu.Item key='2'>User</Menu.Item>
        </Menu>

        <Content style={{ padding: '0 50px' }}>
          <div className='site-layout-content'>{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Daytechstagram ©2020 Created by Apple
        </Footer>
      </Layout>
    </>
  );
};

export default MainLayout;
