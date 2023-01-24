import { h } from 'preact';
import style from './style.css';
import { Tile } from './Tile';

export const Tiles = ({ items, selectedWord, doShowRelated, tileActions }) => (
  <ul class={style.tiles}>
    { items.map(item => (
      <li>
        <Tile
          selectedWord={selectedWord}
          verse={item}
          doShowRelated={doShowRelated}
          actions={tileActions}/>
      </li>
    )) }
  </ul>
);

