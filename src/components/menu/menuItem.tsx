import React, { useRef, useContext } from 'react';
import { IComponentProps } from '../../interfaces';
import { Nav, Button, Div } from '../styledComponents';
import { Link } from 'gatsby';
import { useHover, ThemeContext } from '../../hooks';
import { FONT } from '../../constants';

interface IMenuItemProps extends IComponentProps {
  path?: string;
  onClick?: () => void;
}

const MenuItem = (props: IMenuItemProps) => {
  const hoverRef = useRef<HTMLDivElement>(undefined);
  const isHovered = useHover(hoverRef);
  const { theme } = useContext(ThemeContext);

  return (
    <Div padding='0 0 0 1.2rem' onClick={props.onClick}>
      <div ref={hoverRef}>
        <Link
          to={props.path}
          style={{
            color: theme.font,
            fontSize: '1.1rem',
            fontFamily: FONT.primary,
            textDecoration: 'none',
          }}
        >
          <Div color={isHovered && theme.hover}>{props.children}</Div>
        </Link>
      </div>
    </Div>
  );
};

export default MenuItem;
