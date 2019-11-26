import { Link } from 'gatsby';
import React, { useContext } from 'react';
import { Div } from '../styledComponents';
import { ThemeContext } from '../../hooks';

interface IHeaderProps {
  siteTitle?: string;
}

const Header = (props: IHeaderProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Div margin='0 0 2rem 0'>
      <Div
        display='flex'
        justifyContent='space-between'
        margin='0 auto'
        padding='1.4rem 1.0875rem 1.2rem 1rem'
      >
        <Div display='flex' padding='0.35rem 0' margin='0 auto'>
          <Link
            to='/'
            style={{
              color: theme.font,
              textDecoration: `none`,
              fontSize: '2.1rem',
              fontFamily: 'BMHANNAAir',
              fontWeight: 'bold',
            }}
          >
            {props.siteTitle}
          </Link>
        </Div>
      </Div>
      {/* <hr /> */}
    </Div>
  );
};

export default Header;
