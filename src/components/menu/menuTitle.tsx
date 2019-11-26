import React, { useRef } from 'react';
import { IComponentProps } from '../../interfaces';
import { Nav, Button, Div } from '../styledComponents';
import { Link } from 'gatsby';
import { useHover } from '../../hooks';

interface IMenuTitleProps extends IComponentProps {
  title?: string;
  path?: string;
  onClick?: () => void;
}

const MenuTitle = (props: IMenuTitleProps) => {
  const hoverRef = useRef<HTMLDivElement>(undefined);
  const isHovered = useHover(hoverRef);

  return (
    <>
      <Div margin='1.4rem 0 0.6rem 0' onClick={props.onClick}>
        <div ref={hoverRef}>
          <Link
            to={props.path}
            style={{
              color: 'black',
              fontSize: '1.3rem',
              fontFamily: 'BMHANNAAir',
              fontWeight: 'bold',
            }}
          >
            <Div color={isHovered && '#003399'}>{props.title}</Div>
          </Link>
        </div>
      </Div>
      {props.children}
    </>
  );
};

export default MenuTitle;
