import React, { useState } from 'react';

interface Props {}
import { Form, Input, Button, Image, Typography, Modal } from 'antd';
import { useRecoilState } from 'recoil';
import { createPostState } from '../recoil/atom';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
const { TextArea } = Input;

const CreatePostForm = ({}) => {
  const [modalActivePost, setModalActivePost] = useRecoilState(createPostState);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
  };

  const onFinish = (values: { desc: string; image: any }) => {
    values.image = fileList;
    console.log('Success:', values);
    setModalActivePost(false)
  };

  const handleCancel = () => {
    setModalActivePost(false);
  };

  const [fileList, setFileList] = useState([]);
  //   console.log(fileList);
  const onChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  const onPreview = async ({ file }: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow: Window | null = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <>
      <Modal
        title='Create Post'
        visible={modalActivePost}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          name='formPost'
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name='descPost'
            rules={[{ required: true, message: 'Please Enter Descripton' }]}
          >
            <Input.TextArea
              style={{ margin: '24px 0' }}
              placeholder="What's happening?"
            />
          </Form.Item>
          <Form.Item>
            <ImgCrop rotate>
              <Upload
                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                listType='picture-card'
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 1 && '+ Upload'}
              </Upload>
            </ImgCrop>
          </Form.Item>
          <Form.Item>
            <Button type='dashed' htmlType='submit'>
              Post
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreatePostForm;

// tsrafce
