import * as React from 'react';
import styled from 'styled-components';
import { IComponentProps } from '../../interfaces';

export interface IDivProps extends IComponentProps {
  width?: string;
  maxWidth?: string;
  minHeight?: string;
  height?: string | number;
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
  fontWeight?: string | number;
  color?: string;
  ref?: any;
  overflow?: string;
  hoverColor?: string;
  onClick?: () => void;
}

const StyledDiv = styled.div`
  width: ${(props: IDivProps) => props.width} !important;
  max-width: ${props => props.maxWidth} !important;
  min-height: ${props => props.minHeight} !important;
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
  color: ${props => props.color} !important;
  overflow: ${props => props.overflow};
  ref: ${props => props.ref};
  &:hover {
    color: ${props => props.hoverColor};
  }
`;

export const Div = (props: IDivProps) => <StyledDiv {...props}>{props.children}</StyledDiv>;
