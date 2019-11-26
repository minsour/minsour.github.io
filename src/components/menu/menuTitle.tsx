import React, { useRef, useContext } from 'react';
import { IComponentProps } from '../../interfaces';
import { Nav, Button, Div } from '../styledComponents';
import { Link } from 'gatsby';
import { useHover, ThemeContext } from '../../hooks';
import { FONT } from '../../constants';

interface IMenuTitleProps extends IComponentProps {
  title?: string;
  path?: string;
  onClick?: () => void;
}

const MenuTitle = (props: IMenuTitleProps) => {
  const hoverRef = useRef<HTMLDivElement>(undefined);
  const isHovered = useHover(hoverRef);
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Div margin='1.4rem 0 0.6rem 0' onClick={props.onClick}>
        <div ref={hoverRef}>
          <Link
            to={props.path}
            style={{
              color: theme.font,
              fontSize: '1.3rem',
              fontFamily: FONT.primary,
              fontWeight: 'bold',
            }}
          >
            <Div color={isHovered && theme.hover}>{props.title}</Div>
          </Link>
        </div>
      </Div>
      {props.children}
    </>
  );
};

export default MenuTitle;
