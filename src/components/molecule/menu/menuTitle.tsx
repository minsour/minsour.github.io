import React from 'react';
import { IComponentProps } from '../../../interfaces';
import { Nav, Button, Div } from '../../atoms';
import { Link } from 'gatsby';

interface IMenuTitleProps extends IComponentProps {
  title?: string;
  path?: string;
  onClick?: () => void;
}

const MenuTitle = (props: IMenuTitleProps) => {
  return (
    <>
      <Div margin='24px 0 11px 0' onClick={props.onClick}>
        <Link
          to={props.path}
          style={{
            color: 'black',
            fontSize: '23px',
            fontFamily: 'godic',
          }}
        >
          {props.title}
        </Link>
      </Div>
      {props.children}
    </>
  );
};

export default MenuTitle;
