import React, { useContext } from 'react';
import { Button, Div } from '../styledComponents';
import { ThemeContext } from '../../hooks';
import { FONT } from '../../constants';

const ThemeButton = _ => {
  const { isLighted, theme, changeTheme } = useContext(ThemeContext);

  return (
    <Button
      onClick={() => {}}
      display='flex'
      position='absolute'
      top='1.6rem'
      right='1.78rem'
      background='transparent'
      border='none'
      padding='0'
      zIndex={10}
    >
      <Div
        fontFamily={FONT.primary}
        fontSize='1.19rem'
        fontWeight='bold'
        color={theme.font}
      >
        {isLighted ? 'Light' : 'Dark'}
      </Div>
    </Button>
  );
};

export default ThemeButton;
