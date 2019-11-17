import * as React from 'react';
import styled from 'styled-components';
import { IComponentProps } from '../../interfaces';

export interface INavProps extends IComponentProps {
  width?: string;
  maxWidth?: string;
  height?: string;
  position?: string;
  padding?: string;
  margin?: string;
  transition?: string;
  opacity?: number;
  display?: string;
  transform?: string | any;
  background?: string;
  justifyContent?: string;
  flexDirection?: string;
  textAlign?: string;
  top?: number;
  left?: number;
  zIndex?: number;
  open?: boolean;
}

const StyledNav = styled.nav`
  display: ${(props: INavProps) => props.display} !important;
  flex-direction: ${props => props.flexDirection};
  justify-content: ${props => props.justifyContent};
  background: ${props => props.background} !important;
  height: ${props => props.height};
  width: ${props => props.width};
  text-align: ${props => props.textAlign};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  position: ${props => props.position};
  top: ${props => props.top};
  left: ${props => props.left};
  transition: ${props => props.transition};
  transform: ${props => (props.open ? 'translateX(0)' : 'translateX(-100%)')};
  z-index: ${props => props.zIndex};

  @media (max-width: 576px) {
      width: 100%;
    }
  }
`;

export const Nav = (props: INavProps) => <StyledNav {...props}>{props.children}</StyledNav>;
