/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useCallback, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Header, Menu } from '../../molecule';
import './layout.css';
import { Div } from '../../atoms';

interface ILayoutProps {
  children: JSX.Element[] | JSX.Element;
}

const Layout: React.FC<ILayoutProps> = (props: ILayoutProps) => {
  const [open, setOpen] = useState(false);
  const clickButton = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <>
      {open && (
        <Div
          background='rgba(0,0,0,0.4)'
          width='100vw'
          height='100vh'
          onClick={clickButton}
          position='absolute'
          zIndex={3}
        />
      )}
      <Header siteTitle='민수르 블로그' />
      <Menu open={open} clickButton={clickButton} />
      <Div margin='0 auto' maxWidth='960px' padding='0 1.0875rem 1.45rem'>
        <main>{props.children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href='https://www.gatsbyjs.org'>Gatsby</a>
        </footer>
      </Div>
    </>
  );
};

export default Layout;
