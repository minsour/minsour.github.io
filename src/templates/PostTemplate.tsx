import React from 'react';
import Layout from '../components/layout';
import { ITemplateProps } from '../interfaces';
import Utterances from '../lib/utterances';
import { Div } from '../components/styledComponents';
import { ThemeProvider } from '../hooks';
import { FONT } from '../constants';

type IPostTemplateProps = ITemplateProps<{
  html: string;
  title: string;
  date: string;
}>;

const PostTemplate: React.FC<IPostTemplateProps> = React.memo(props => {
  const { title, date, html } = props.pageContext;

  return (
    <ThemeProvider>
      <Layout>
        {/* <Div background='rgba(189,189,189,0.2)'> */}
        <Div fontFamily={FONT.primary} fontSize='1.8em' fontWeight='bold'>
          {title}
        </Div>
        <Div
          fontFamily={FONT.primary}
          fontSize='0.9em'
          color='gray'
          margin='0.6em 0 1.3em 0'
        >
          {date}
        </Div>
        {/* </Div> */}
        {/* <Div fontFamily='godic' fontSize='1em' margin='0.5em 0'></Div> */}
        <hr />
        <div
          style={{ fontFamily: FONT.contents, marginTop: '2.5em' }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <Utterances />
      </Layout>
    </ThemeProvider>
  );
});

export default PostTemplate;
