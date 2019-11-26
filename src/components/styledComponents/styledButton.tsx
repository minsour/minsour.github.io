import * as React from 'react';
import styled, { css } from 'styled-components';
import { IComponentProps } from '../../interfaces';

export interface IButtonProps extends IComponentProps {
  width?: string;
  height?: string;
  position?: string;
  padding?: string;
  margin?: string;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  zIndex?: number;
  transition?: string;
  opacity?: number;
  display?: string;
  transform?: string | any;
  flexDirection?: string;
  justifyContent?: string;
  background?: string;
  hoverColor?: string;
  border?: string | number;
  outline?: string | number;
  borderRadius?: string;
  open?: boolean;
  burger?: boolean;
  onClick: () => void;
}
const buggerStyling = (open: boolean) => {
  return css`
    div {
      width: 27px;
      height: 3.2px;
      background: #0d0c1d;
      border-radius: 10px;
      transition: all 0.3s linear;
      position: relative;
      transform-origin: 1px;

      :first-child {
        transform: ${open ? 'rotate(45deg)' : 'rotate(0)'};
      }

      :nth-child(2) {
        opacity: ${open ? '0' : '1'};
        transform: ${open ? 'translateX(20px)' : 'translateX(0)'};
      }

      :nth-child(3) {
        transform: ${open ? 'rotate(-45deg)' : 'rotate(0)'};
      }
    }
  `;
};

const StyledButton = styled.button`
  position: ${(props: IButtonProps) => props.position};
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  display: ${props => props.display};
  flex-direction: ${props => props.flexDirection};
  justify-content: ${props => props.justifyContent};
  width: ${props => props.width};
  height: ${props => props.height};
  background: ${props => props.background};
  border: ${props => props.border};
  cursor: pointer;
  padding: ${props => props.padding};
  z-index: ${props => props.zIndex};
  margin: ${props => props.margin} !important;
  transition: ${props => props.transition} !important;
  opacity: ${props => props.opacity} !important;
  transform: ${props => props.transform} !important;
  outline: ${props => props.outline} !important;
  border-radius: ${props => props.borderRadius} !important;
  &:hover {
    background: ${props => props.hoverColor} !important;
  }
  &:focus {
    outline: none;
  }
  ${props => props.burger && buggerStyling(props.open)}
`;

export const Button = (props: IButtonProps) => <StyledButton {...props}>{props.children}</StyledButton>;
