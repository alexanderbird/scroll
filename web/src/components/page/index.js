import { h } from 'preact';
import style from './style.css';
import Header from '../header';

export const Page = ({ children, title }) => (
  <div class={style.page}>
    <Header title={title}/>
    <main>
      {children}
    </main>
  </div>
);
