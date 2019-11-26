import React from 'react';
import { Ul } from '../styledComponents';
import { graphql, useStaticQuery } from 'gatsby';
import PostingHeader from './postingHeader';
import PostingBody from './postingBody';

const WebPostListQuery = graphql`
  query WebPostListQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { subCategory: { eq: "web" } } }
    ) {
      edges {
        node {
          excerpt(truncate: true, pruneLength: 200)
          frontmatter {
            title
            path
            date(formatString: "YYYY-MM-DD HH:mm:ss")
          }
          id
        }
      }
    }
  }
`;

const WebPosting = () => {
  const data = useStaticQuery(WebPostListQuery);
  return (
    <>
      <PostingHeader />
      <Ul margin='0.2rem' listStyle='none'>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <PostingBody node={node} />
        ))}
      </Ul>
    </>
  );
};

export default WebPosting;
