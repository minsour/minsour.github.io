import React from 'react';
import Layout from '../components/layout';
import { ITemplateProps } from '../interfaces';
import Utterances from '../lib/utterances';

type IPostTemplateProps = ITemplateProps<{
  html: string;
  title: string;
  date: string;
}>;

const PostTemplate: React.FC<IPostTemplateProps> = React.memo(props => {
  const { title, date, html } = props.pageContext;
  return (
    <Layout>
      <h2>{title}</h2>
      <h4>{date}</h4>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Utterances />
    </Layout>
  );
});

export default PostTemplate;
