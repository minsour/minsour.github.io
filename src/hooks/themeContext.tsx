import React, { useState } from 'react';
import { IThemeType } from '../interfaces';
import { THEME } from '../constants';

export const ThemeContext = React.createContext(undefined);

export const ThemeProvider = props => {
  const [isLighted, setIsLighted] = useState(true);
  const [theme, setTheme] = useState<IThemeType>(THEME.light);

  const changeTheme = () => {
    isLighted ? setTheme(THEME.dark) : setTheme(THEME.light);
    setIsLighted(!isLighted);
  };
  return (
    <ThemeContext.Provider value={{ isLighted, theme, changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
