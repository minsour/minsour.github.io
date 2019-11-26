import React, { useContext } from 'react';
import { IComponentProps } from '../../interfaces';
import { Nav, Button, Div } from '../styledComponents';
import { ThemeContext } from '../../hooks';

interface IMenuLayoutProps extends IComponentProps {
  open?: boolean;
  clickButton?: () => void;
}

const MenuLayout = (props: IMenuLayoutProps) => {
  const { theme } = useContext(ThemeContext);

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
        width='1.5rem'
        height='1.5rem'
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
        background={theme.contentBackground}
        width='19rem'
        display='flex'
        flexDirection='column'
        textAlign='left'
        padding='5.9rem 2.5rem'
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
