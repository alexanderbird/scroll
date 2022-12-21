import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';
import { serialize } from '../../data-transformations/verse';

export const Tiles = ({ items }) => (
  <ul class={style.tiles}>
    { items.map(item => <li><Tile {...item} /></li>) }
  </ul>
);

const Tile = (verse) => {
  const { text, reference, related, id, selected } = verse;
  const classes = [style.tile, 'reset']
  if (verse.selected) {
    classes.push(style.tileSelected);
  }
  return (
    <Link class={classes.join(' ')} href={`/v/${id}/${serialize(verse)}`}>
      <div class={style.tileReference}>{reference}</div>
      <div class={style.tileText}>{text}</div>
    </Link>
  );
}
