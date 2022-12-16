import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

export const Tiles = ({ items }) => (
  <ul class={style.tiles}>
    { items.map(item => <li><Tile {...item} /></li>) }
  </ul>
);

const Tile = ({ text, reference, related }) => (
  <div class={style.tile}>
    <div class={style.tileReference}>{reference}</div>
    <div class={style.tileText}>{text}</div>
  </div>
);
