import * as React from 'react';
import styled from 'styled-components';
import { IComponentProps } from '../../interfaces';

export interface ILiProps extends IComponentProps {
  width?: string;
  maxWidth?: string;
  height?: string;
  position?: string;
  padding?: string;
  margin?: string;
  zIndex?: number;
  transition?: string;
  opacity?: number;
  top?: number | string;
  left?: number | string;
  display?: string;
  transform?: string | any;
  background?: string;
  justifyContent?: string;
  fontFamily?: string;
  fontSize?: string;
  boxShadow?: string;
  fontWeight?: string | number;
  hoverColor?: string;
  hoverBackground?: string;
  onClick?: () => void;
}

const StyledLi = styled.li`
  width: ${(props: ILiProps) => props.width} !important;
  max-width: ${props => props.maxWidth} !important;
  height: ${props => props.height} !important;
  position: ${props => props.position} !important;
  padding: ${props => props.padding} !important;
  margin: ${props => props.margin} !important;
  z-index: ${props => props.zIndex} !important;
  transition: ${props => props.transition} !important;
  opacity: ${props => props.opacity} !important;
  display: ${props => props.display} !important;
  transform: ${props => props.transform} !important;
  background: ${props => props.background} !important;
  justify-content: ${props => props.justifyContent} !important;
  top: ${props => props.top} !important;
  left: ${props => props.left} !important;
  font-family: ${props => props.fontFamily} !important;
  font-size: ${props => props.fontSize} !important;
  font-weight: ${props => props.fontWeight} !important;
  box-shadow: ${props => props.boxShadow} !important;
  &:hover {
    color: ${props => props.hoverColor};
    background: ${props => props.hoverBackground} !important;
  }
`;

export const Li = (props: ILiProps) => <StyledLi {...props}>{props.children}</StyledLi>;
