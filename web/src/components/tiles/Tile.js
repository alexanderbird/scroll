import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';
import { serialize } from '../../data-transformations/verse';

const VerseSegment = ({ segment, verseContent }) => (
  <Link class={style.verseSegment} href={`/word/${segment.s}/${verseContent}`} title={segment.s}>{segment.t}</Link>
);

export const Tile = ({ selectedWord, verse }) => {
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
  if (type === "STRONGS_ENTRY") {
    const { contextVerse } = verse;
    const phrase = contextVerse.data.filter(x => x.s === id)[0].t;
    const language = id.substring(0) === 'H' ? 'Hebrew' : 'Greek';
    const countOfRelated = related.split(',').length - 1;
    return (
      <div class={classes.join(' ')}>
        <p>
          In {contextVerse.reference}, <em>"{ phrase }"</em> is translated from the {language} word {data.original} which means something like
          <blockquote>{data.definition}</blockquote>
        </p>
        <p>
          There are {countOfRelated} other verse that include {data.original}.
        </p>
      </div>
    );
  }
  throw new Error("Unsupported tile type " + type);
}
