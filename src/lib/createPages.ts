import { CreatePagesArgs } from 'gatsby';
import path from 'path';
// import { Query } from '../graphql-types';

export async function createPages({ actions, graphql }: CreatePagesArgs) {
  const { createPage } = actions;

  const { data, errors } = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            frontmatter {
              title
              date(formatString: "YYYY-MM-DD HH:mm:ss")
              path
            }
          }
        }
      }
    }
  `);

  if (errors) {
    throw errors;
  }

  data.allMarkdownRemark.edges.forEach(({ node }: any) => {
    createPage({
      path: node.frontmatter.path,
      context: {
        html: node.html,
        title: node.frontmatter.title,
        date: node.frontmatter.date,
      },
      component: path.resolve(__dirname, '../templates/PostTemplate.tsx'),
    });
  });
}
