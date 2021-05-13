import {
  Button,
  DatePicker,
  Typography,
  version,
  Layout,
  Menu,
  Breadcrumb,
} from 'antd';

const { Header, Content, Footer } = Layout;
const { Title, Link } = Typography;
interface MainLayoutProps {
  children: JSX.Element;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Layout className='layout'>
        <Header></Header>
        <Content style={{ padding: '0 50px' }}>
          <button className='text-blue-500'><Link href='/'>Home</Link></button> / 
          <button className='text-blue-500'><Link href='/signin'>SignIn</Link></button>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><Link href='/'>Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link href='/signin'>SignIn</Link></Breadcrumb.Item>
          </Breadcrumb> */}
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
