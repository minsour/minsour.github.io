import React from 'react';
import { Div } from '../styledComponents';
import { categoryTitle } from '../../constants';

const PostingHeader = () => {
  const path = window.location.search;

  const getCategory = (path: string) => {
    if (!path) return 'total';
    if (path.substr(path.indexOf('?') + 1, path.indexOf('=') - 1) === 'category') {
      return path.substr(path.indexOf('=') + 1, path.length - (path.indexOf('=') + 1));
    }
  };
  return (
    <Div fontFamily='BMHANNAAir' fontSize='1.1rem' fontWeight='bold' margin='1.8rem 0 2.2rem 0'>
      {categoryTitle.get(getCategory(path))}
    </Div>
  );
};

export default PostingHeader;
