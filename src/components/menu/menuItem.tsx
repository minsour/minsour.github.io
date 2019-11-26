import React, { useRef } from 'react';
import { IComponentProps } from '../../interfaces';
import { Nav, Button, Div } from '../styledComponents';
import { Link } from 'gatsby';
import { useHover } from '../../hooks';

interface IMenuItemProps extends IComponentProps {
  path?: string;
  onClick?: () => void;
}

const MenuItem = (props: IMenuItemProps) => {
  const hoverRef = useRef<HTMLDivElement>(undefined);
  const isHovered = useHover(hoverRef);

  return (
    <Div padding='0 0 0 1.2rem' onClick={props.onClick}>
      <div ref={hoverRef}>
        <Link
          to={props.path}
          style={{
            color: 'black',
            fontSize: '1.1rem',
            fontFamily: 'BMHANNAAir',
            textDecoration: 'none',
          }}
        >
          <Div color={isHovered && '#003399'}>{props.children}</Div>
        </Link>
      </div>
    </Div>
  );
};

export default MenuItem;
