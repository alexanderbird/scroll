import { h } from 'preact';
import style from './style.css';
import { Link } from 'preact-router/match';

export const LicenseSummary = ({ textOnly }) => (
  <div class={textOnly ? '' : style.license}>
    <span>Scripture taken from the <a href="https://worldenglish.bible/">World English Bible</a> (Public Domain) </span>
    <span>and annotated with Strong's numbers by <a href="https://studybible.info">studybible.info</a>. </span>
    <span>Cross References from <a href="https://openbible.info">openbible.info</a> (<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>). </span>
    <span>Strong's dictionary from <a href="https://openscriptures.org">openscriptures.org</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>). </span>
    <span>For details see the <Link href="/about/license">License</Link> page.</span>
  </div>
);
