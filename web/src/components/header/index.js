import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';
import packageJson from '../../../package.json';
const { readmeUrl } = packageJson.content;

const Header = () => (
  <header class={style.header}>
    <Link activeClassName={style.active} href="/"><h1>Scroll Bible</h1></Link>
    <nav>
      <Link activeClassName={style.active} href="/about/license">License</Link>
      <a activeClassName={style.active} href={readmeUrl}>About</a>
    </nav>
  </header>
);

export default Header;
