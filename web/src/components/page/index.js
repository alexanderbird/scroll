import { h } from 'preact';
import style from './style.css';
import Header from '../header';
import Footer from '../footer';

export const Page = ({ children, title }) => (
  <div class={style.page}>
    <Header title={title}/>
    <main>
      {children}
    </main>
    <Footer />
  </div>
);
