import React, { useCallback, useState, useContext } from 'react';
import Header from '../header';
import Menu from '../menu';
import './layout.css';
import { Div } from '../styledComponents';
import ThemeButton from '../themeButton';
import { ThemeContext } from '../../hooks';

interface ILayoutProps {
  children: JSX.Element[] | JSX.Element;
}

const Layout: React.FC<ILayoutProps> = (props: ILayoutProps) => {
  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const clickButton = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <Div
      background={theme.background}
      overflow={open && 'hidden'}
      height={open && '100vh'}
      minHeight='100vh'
    >
      {open && (
        <Div
          background={theme.backdrop}
          width='100vw'
          height='100vh'
          onClick={clickButton}
          position='absolute'
          zIndex={3}
        />
      )}
      <Header siteTitle='민수르 블로그' />
      <Menu open={open} clickButton={clickButton} />
      <ThemeButton />
      <Div margin='0 auto' maxWidth='46rem' padding='0 1.0875rem 1.45rem'>
        <main>{props.children}</main>
        <footer>
          {/* <a href='https://www.gatsbyjs.org' style={{ marginLeft: '0.3em', color: 'black' }}>
            Github
          </a> */}
        </footer>
      </Div>
    </Div>
  );
};

export default Layout;
