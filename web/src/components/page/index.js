import { h } from 'preact';
import style from './style.css';
import Header from '../header';
import { styled } from '@mui/system';

const ThemeCssVariableProvider = styled('div')(({ theme }) => ({
  '--color-primary': theme.palette.primary.main,
  '--color-secondary': theme.palette.secondary.main,
  '--color-secondary-text': theme.palette.secondary.contrastText,
  '--color-light-gray': theme.palette.grey[600],
  '--color-dark-gray': theme.palette.grey[200],
  height: '100%',
}));

export const Page = ({ children, title }) => (
  <ThemeCssVariableProvider>
    <Header title={title}/>
    <main class={style.pageMain}>
      {children}
    </main>
  </ThemeCssVariableProvider>
);
