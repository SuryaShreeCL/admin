import React, { useState } from 'react';
import { CreatePostContainer } from '../Assets/Styles/WallStyles';
import BackHandler from '../Components/BackHandler';
import Preview from '../Components/Preview';
import Select from 'react-select';

const Products = [
  { value: '', label: 'Category' },
  { value: 'MBA Admission', label: 'MBA Admission' },
  { value: 'Admission Consulting Services', label: 'Admission Consulting Services' },
  { value: 'GMAT', label: 'GMAT' },
  { value: 'GRE', label: 'GRE' },
  { value: 'Profile Builder', label: 'Profile Builder' },
];

const CreatePost = () => {
  const [product, setProduct] = useState('');
  return (
    <>
      <BackHandler title='Create New Post' />
      <CreatePostContainer>
        <div className='CreatePost'>
          <h5>Select Category</h5>
          <Select
            options={Products}
            className='select-category'
            isSearchable={false}
            defaultValue={Products[0]}
            onChange={(product) => setProduct(product.value)}
          />
        </div>
        <Preview />
      </CreatePostContainer>
    </>
  );
};

export default CreatePost;
