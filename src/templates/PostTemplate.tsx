import React from 'react';
import Layout from '../components/layout';
import { ITemplateProps } from '../interfaces';
import Utterances from '../lib/utterances';
import { Div } from '../components/styledComponents';
import { ThemeProvider } from '../hooks';
import { FONT, THEME } from '../constants';
import SEO from '../components/seo';

type IPostTemplateProps = ITemplateProps<{
  html: string;
  title: string;
  date: string;
  excerpt: any;
}>;

const PostTemplate: React.FC<IPostTemplateProps> = React.memo(props => {
  const { title, date, html, excerpt } = props.pageContext;

  return (
    <ThemeProvider>
      <Layout>
        <SEO title={title} description={excerpt} />
        <Div fontFamily={FONT.primary} fontSize='1.8em' fontWeight='bold'>
          {title}
        </Div>
        <Div
          fontFamily={FONT.primary}
          fontSize='0.9em'
          color={THEME.light.date}
          margin='0.6em 0 1.3em 0'
        >
          {date}
        </Div>
        <hr />
        <Div
          background={THEME.light.contentBackground}
          boxShadow='0 0.1rem 0.5rem 0 rgba(0, 0, 0, 0.07)'
          padding='2rem 1.8rem 1.5rem 1.8rem'
        >
          <div
            style={{ fontFamily: FONT.contents, color: THEME.light.font }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <Utterances />
        </Div>
      </Layout>
    </ThemeProvider>
  );
});

export default PostTemplate;
