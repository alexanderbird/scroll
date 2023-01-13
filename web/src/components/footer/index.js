import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';
import packageJson from '../../../package.json';
const { readmeUrl } = packageJson.content;

const Footer = () => (
  <footer class={style.footer}>
    Feedback/suggestions/requests 👉 <a href="mailto:feedback@scrollbible.app">feedback@scrollbible.app</a>.
  </footer>
);

export default Footer;
