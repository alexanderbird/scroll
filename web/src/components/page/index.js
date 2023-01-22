import { h } from 'preact';
import style from './style.css';

export const Page = ({ title, children }) => (
  <div class={style.page}>
    <Header title={title} />
    <div class={style.pageContent}>
      {children}
    </div>
  </div>
);
