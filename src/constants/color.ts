const COLOR = {
  black: '#1E1E1E',
  white: '#FFFFFF',
  lightGray: 'rgba(180,180,180,0.1)',
  transparentGray: 'rgba(0,0,0,0.4)',
  darkTransparentGray: 'rgba(0,0,0,0.8)',
  gray: '#808080',
  blue: '#003399',
  darkGray: '#292C34',
  fontWhite: '#FAFAFA',
  contentGray: '#2D3751',
  skyBlue: 'rgba(30,144,255,.39)',
  purple: '#725dcc',
};

export const THEME = {
  light: {
    font: COLOR.black,
    contentBackground: COLOR.white,
    background: COLOR.lightGray,
    backdrop: COLOR.transparentGray,
    hover: COLOR.blue,
    date: COLOR.gray,
  },
  dark: {
    font: COLOR.fontWhite,
    background: COLOR.darkGray,
    contentBackground: COLOR.contentGray,
    backdrop: COLOR.darkTransparentGray,
    hover: COLOR.skyBlue,
    date: COLOR.purple,
  },
};
