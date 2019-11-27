import React, { useContext } from 'react';
import { Div } from '../styledComponents';
import { categoryTitle, FONT } from '../../constants';
import { ThemeContext } from '../../hooks';

const PostingHeader = () => {
  const path = typeof window !== `undefined` && window.location.search;
  const { theme } = useContext(ThemeContext);

  const getCategory = (path: string) => {
    if (!path) return 'total';
    if (path.substr(path.indexOf('?') + 1, path.indexOf('=') - 1) === 'category') {
      return path.substr(path.indexOf('=') + 1, path.length - (path.indexOf('=') + 1));
    }
  };
  return (
    <Div
      fontFamily={FONT.primary}
      fontSize='1.1rem'
      fontWeight='bold'
      margin='1.8rem 0 2.2rem 0'
      color={theme.font}
    >
      {categoryTitle.get(getCategory(path))}
    </Div>
  );
};

export default PostingHeader;
