import React from 'react';
import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import Posting from '../components/posting';
import { ThemeProvider } from '../hooks';

const IndexPage: React.FC = () => {
  return (
    <ThemeProvider>
      <Layout>
        <SEO title='민수르 블로그' />
        <Posting />
      </Layout>
    </ThemeProvider>
  );
};

export default IndexPage;
