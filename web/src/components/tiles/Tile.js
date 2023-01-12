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
          ? <div class={style.tileStrongs}>{data.filter(x => !!x.t.trim()).map(segment => <VerseSegment segment={segment} verseContent={serialize(verse)} />)}</div>
          : <div class={style.tileText}>{data.map(segment => (
              <span class={segment.s === selectedWord ? style.selectedWord : ''}>{segment.t} </span>
            ))}</div>
        }
      </Link>
    );
  }
  if (type === "LINK") {
    return <Link class={classes.join(' ')} href={data.href}>{data.text}</Link>;
  }
  if (type === "TEXT") {
    return <p class={classes.join(' ')}>{data}</p>;
  }
  if (type === "STRONGS_ENTRY") {
    const contextVerse = verse ? verse.contextVerse : false;
    console.log({ contextVerse, isContextVerse: !!contextVerse })
    const language = id.substring(0) === 'H' ? 'Hebrew' : 'Greek';
    const introduction = contextVerse && contextVerse.data
      ? (<span>
          In {contextVerse.reference}, <em>"{ contextVerse.data.filter(x => x.s === id)[0].t }"</em> is translated from the {language} word {data.transliteration} ({data.original})
        </span>)
      : <span>The {language} word {data.transliteration} ({data.original})</span>;
    const countOfRelated = related
      ? contextVerse ? related.split(',').length - 1 : related.split(',').length
      : 0;
    return (
      <div class={classes.join(' ')}>
        <p>
          {introduction}
          <span> which means something like:</span>
          <blockquote>{data.definition}</blockquote>
        </p>
        <p>There { countOfRelated === 1
          ? "is 1 " + (contextVerse ? "other " : "") + "verse that includes"
          : "are " + countOfRelated + " " + (contextVerse ? "other " : "") + "verses that include"
        } {data.original}.</p>
        <StrongsDerivation {...data} contextVerse={serialize(contextVerse)} />
      </div>
    );
  }
  throw new Error("Unsupported tile type " + type);
}

const StrongsDerivation = ({ transliteration, derivation, contextVerse}) => {
  const upperCaseTransliteration = transliteration.slice(0, 1).toUpperCase() + transliteration.slice(1);
  const relatedWordIds = derivation.match(/([GH][0-9]+)/g);
  if (!relatedWordIds) return <p>{derivation}</p>;
  const relatedWordIdsPattern = new RegExp("(" + relatedWordIds.join("|") +")");
  const derivationChunks = derivation.split(relatedWordIdsPattern);
  return (
    <p>
      <span>{upperCaseTransliteration} is </span>
      {derivationChunks.map(chunk => chunk.match(relatedWordIdsPattern)
        ? <Link href={`/word/${chunk}`}>{chunk}</Link>
        : <span>{chunk}</span>
      )}
    </p>
  );
}
