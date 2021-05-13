import { Button, DatePicker, Typography, version } from 'antd';
const { Title } = Typography;

export default function Home() {
  return (
    <>
      <Title level={2}>antd version: {version}</Title>
      <DatePicker />
      <Button type='primary' className='ml-2'>
        Primary Button
      </Button>
    </>
  );
}