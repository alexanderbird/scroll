import { h } from 'preact';
import style from './style.css';
import Header from '../header';
import Footer from '../footer';

export const Page = ({ children }) => (
  <div class={style.page}>
    <Header />
    <main>
      {children}
    </main>
    <Footer />
  </div>
);
