import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';
import { serialize } from '../../data-transformations/verse';

export const Tiles = ({ items, selectedWord }) => (
  <ul class={style.tiles}>
    { items.map(item => <li><Tile selectedWord={selectedWord} verse={item} /></li>) }
  </ul>
);

const VerseSegment = ({ segment, verseContent }) => (
  <Link href={`/word/${segment.s}/${verseContent}`} title={segment.s}>{segment.t} </Link>
);

const Tile = ({ selectedWord, verse }) => {
  const { type, data, reference, related, id, selected } = verse;
  const classes = [style.tile, 'reset']
  if (verse.selected) {
    classes.push(style.tileSelected);
  }
  if (type === "TEXT_WITH_STRONGS") {
    return (
      <Link class={classes.join(' ')} href={`/v/${id}/${serialize(verse)}`}>
        <div class={style.tileReference}>{reference}</div>
        { selected
          ? <div class={style.tileStrongs}>{data.map(segment => <VerseSegment segment={segment} verseContent={serialize(verse)} />)}</div>
          : <div class={style.tileText}>{data.map(segment => (
              <span class={segment.s === selectedWord ? style.selectedWord : ''}>{segment.t} </span>
            ))}</div>
        }
      </Link>
    );
  }
  if (type === "TEXT") {
    return <p class={classes.join(' ')}>{data}</p>;
  }
  throw new Error("Unsupported tile type " + type);
}
