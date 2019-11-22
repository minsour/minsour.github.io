import React from 'react';
import { IComponentProps } from '../../../interfaces';
import { Nav, Button, Div } from '../../atoms';

interface IMenuLayoutProps extends IComponentProps {
  open?: boolean;
  clickButton?: () => void;
}

const MenuLayout = (props: IMenuLayoutProps) => {
  return (
    <>
      <Button
        open={props.open}
        onClick={props.clickButton}
        display='flex'
        position='absolute'
        top='1.55rem'
        left='2rem'
        flexDirection='column'
        justifyContent='space-around'
        width='27px'
        height='27px'
        background='transparent'
        border='none'
        padding='0'
        zIndex={10}
        burger
      >
        <Div />
        <Div />
        <Div />
      </Button>
      <Nav
        open={props.open}
        background='white'
        width='340px'
        display='flex'
        flexDirection='column'
        textAlign='left'
        padding='106px 45px'
        transition='transform 0.3s ease-in-out'
        position='absolute'
        top={0}
        left={0}
        height='100vh'
        zIndex={5}
      >
        {props.children}
      </Nav>
    </>
  );
};

export default MenuLayout;
