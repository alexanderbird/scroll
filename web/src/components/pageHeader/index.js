import { h } from 'preact';
import style from './style.css';
import Button from '@mui/material/Button';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

export const PageHeader = ({ children }) => (
  <div class={style.pageHeader}>
    <div class={style.pageHeaderBackButton}>
      <Button onClick={() => window.history.back()}>
        <KeyboardDoubleArrowLeftIcon />
        <span class={style.pageHeaderBackButtonLabel}>back</span>
      </Button>
    </div>
    <h3>{ children }</h3>
    <div class={style.pageHeaderSpacer} />
  </div>
);
