import { h } from 'preact';
import style from './style.css';
import Header from '../header';
import { styled } from '@mui/system';

const ThemeCssVariableProvider = styled('div')(({ theme }) => ({
  '--color-primary': theme.palette.primary.main,
  '--color-primary-dark': theme.palette.primary.dark,
  '--color-primary-light': theme.palette.primary.light,
  '--color-secondary': theme.palette.secondary.main,
  '--color-secondary-dark': theme.palette.secondary.dark,
  '--color-secondary-light': theme.palette.secondary.light,
  '--color-secondary-text': theme.palette.secondary.contrastText,
  '--color-light-gray': theme.palette.grey[600],
  '--color-dark-gray': theme.palette.grey[200],
  '--theme-spacing-1': theme.spacing(1),
  '--theme-spacing-2': theme.spacing(2),
  '--theme-spacing-3': theme.spacing(3),
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
