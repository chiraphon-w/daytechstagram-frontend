import React from 'react';
import Home from './index';
import FormComment from '@/components/forms/FormComment';
interface Props {}

const comment = () => {
  return (
    <div>
      <Home />
      {/* <div className='pt-5'>
        <Button
          type='dashed'
          style={{ float: 'right' }}
          onClick={() => setModalActivePost(true)}
        >
          New Post
        </Button>
      </div> */}
      <FormComment />
    </div>
  );
};

export default comment;
