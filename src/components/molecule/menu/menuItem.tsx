import React from 'react';
import { IComponentProps } from '../../../interfaces';
import { Nav, Button, Div } from '../../atoms';
import { Link } from 'gatsby';

interface IMenuItemProps extends IComponentProps {
  path?: string;
  onClick?: () => void;
}

const MenuItem = (props: IMenuItemProps) => {
  return (
    <Div padding='0 0 0 21px' onClick={props.onClick}>
      <Link
        to={props.path}
        style={{
          color: 'black',
          fontSize: '18px',
          fontFamily: 'godic',
        }}
      >
        {props.children}
      </Link>
    </Div>
  );
};

export default MenuItem;
