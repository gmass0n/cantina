import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      primary: string;
      secondary: string;
      primaryDark: string;
      green: string;
      text: string;
      card: string;
      gray: string;
    };
    borderRadius: string;
  }
}
