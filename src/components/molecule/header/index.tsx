import { Link } from 'gatsby';
import React, { useCallback } from 'react';
import { Div, Button, Nav } from '../../atoms';
import { MdMenu } from 'react-icons/md';
import Menu from '../menu';

interface IHeaderProps {
  siteTitle?: string;
}

const Header = (props: IHeaderProps) => {
  return (
    <Div background='white' margin='0 0 1.45rem 0'>
      <Div display='flex' justifyContent='space-between' margin='0 auto' maxWidth=' 960' padding='1.55rem 1.0875rem'>
        <Div display='flex' padding='8px 0' margin='0 auto'>
          <Link
            to='/'
            style={{
              color: `#1E1E1E`,
              textDecoration: `none`,
              fontSize: 36,
              fontFamily: 'godic',
              fontWeight: 'bold',
            }}
          >
            {props.siteTitle}
          </Link>
        </Div>
      </Div>
    </Div>
  );
};

export default Header;
