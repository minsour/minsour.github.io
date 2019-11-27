import React from 'react';
import TotalPosting from './totalPosting';
import DevlogPosting from './devlogPosting';
import WebPosting from './webPosting';
import ReactPosting from './reactPosting';
import BlockchainPosting from './blockchainPosting';
import LifelogPosting from './lifelogPosting';

const PostList = () => {
  const getCategory = (path: string) => {
    if (!path) return 'total';
    if (path.substr(path.indexOf('?') + 1, path.indexOf('=') - 1) === 'category') {
      return path.substr(path.indexOf('=') + 1, path.length - (path.indexOf('=') + 1));
    }
  };
  const category = getCategory(typeof window !== `undefined` && window.location.search);

  switch (category) {
    case 'total':
      return <TotalPosting />;
    case 'devlog':
      return <DevlogPosting />;
    case 'web':
      return <WebPosting />;
    case 'react':
      return <ReactPosting />;
    case 'blockchain':
      return <BlockchainPosting />;
    case 'lifelog':
      return <LifelogPosting />;
  }
};

export default PostList;
