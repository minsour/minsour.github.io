import React, { useContext } from 'react';
import { Button, Div } from '../styledComponents';
import { ThemeContext } from '../../hooks';

const ThemeButton = _ => {
  const { isLighted, theme, changeTheme } = useContext(ThemeContext);

  return (
    <Button
      onClick={changeTheme}
      display='flex'
      position='absolute'
      top='1.61rem'
      right='1.78rem'
      background='transparent'
      border='none'
      padding='0'
      zIndex={10}
    >
      <Div fontFamily='godic' fontSize='1.19rem' fontWeight='bold' color={theme.font}>
        {isLighted ? 'Light' : 'Dark'}
      </Div>
    </Button>
  );
};

export default ThemeButton;
