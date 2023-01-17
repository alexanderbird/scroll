import { h } from 'preact';
import style from './style.css';
import CircularProgress from '@mui/material/CircularProgress';

export const Loading = () => <div class={style.loading}><CircularProgress /></div>;
