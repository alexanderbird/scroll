import { h } from 'preact';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Link } from 'preact-router/match';
import style from './style.css';
import { serialize } from '../../data-transformations/verse';

export const Tile = ({ selectedWord, verse, doShowRelated }) => {
  const { type, data, reference, related, id, selected } = verse;
  const classes = [style.tile];
  if (verse.selected) {
    classes.push(style.tileSelected);
  }
  if (type === "TEXT_WITH_STRONGS") {
    return selected || verse.doExplodeVerseSegments
      ? <SelectedTextWithStrongs verse={verse} classes={classes} doShowRelated={doShowRelated} selectedWord={selectedWord} />
      : <TextWithStrongs verse={verse} classes={classes} selectedWord={selectedWord}/>
  }
  if (type === "TEXT") {
    return <p class={classes.join(' ')}>{data}</p>;
  }
  if (type === "STRONGS_ENTRY") {
    const contextVerse = verse ? verse.contextVerse : false;
    const language = id[0] === 'H' ? 'Hebrew' : 'Greek';
    const label = {
      short: data.transliteration || data.original,
      full: data.transliteration ? data.transliteration + " (" + data.original + ")" : data.original,
    }
    const introduction = contextVerse && contextVerse.data
      ? (<span>
          In {contextVerse.reference}, <em>"{ contextVerse.data.filter(x => x.s === id)[0]?.t }"</em> is translated from the {language} word {label.full}
        </span>)
      : <span>The {language} word {label.full}</span>;
    const countOfRelated = related
      ? contextVerse ? related.split(',').length - 1 : related.split(',').length
      : 0;
    return (
      <div class={classes.join(' ')}>
        <div class={style.strongsContainer}>
          <p>
            {introduction}
            <span> which means something like:</span>
            <blockquote>{data.definition}</blockquote>
          </p>
          <StrongsDerivation {...data} label={label} contextVerse={serialize(contextVerse)} />
          <p>There { countOfRelated === 1
            ? "is 1 " + (contextVerse ? "other " : "") + "verse that includes"
            : "are " + countOfRelated + " " + (contextVerse ? "other " : "") + "verses that include"
          } {data.original}.</p>
        </div>
      </div>
    );
  }
  throw new Error("Unsupported tile type " + type);
}

const StrongsDerivation = ({ transliteration, derivation, contextVerse, label}) => {
  const upperCaseTransliteration = label.short.slice(0, 1).toUpperCase() + label.short.slice(1);
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

const SelectedTextWithStrongs = ({ classes, verse, doShowRelated, selectedWord }) => {
  const { type, data, reference, related, id, selected, doExplodeVerseSegments } = verse;
  const countOfRelated = related.split(",").filter(x => !!x).length;
  const relatedText = countOfRelated === 1
    ? "1 related verse "
    : `${countOfRelated} related verses `;
  const content = serialize(verse);
  const verseTextComponent = selected || doExplodeVerseSegments
    ? data.filter(x => !!x.t.trim()).map(segment => <VerseSegment segment={segment} verseContent={content} selectedWord={selectedWord} />)
    : data.filter(x => !!x.t.trim()).map(segment => (
            <span class={segment.s === selectedWord ? style.selectedWord : ''}>{segment.t.trim()}&ensp;</span>));
  const childClasses = selected || doExplodeVerseSegments ? [style.tileStrongs, style.tileText] : [style.tileText];
  return ( 
    <div class={classes.join(' ')}>
      <div class={style.tileReference}><ResponsiveReference reference={reference}/></div>
      <div class={childClasses.join(' ')}>
        <div>{ verseTextComponent }</div>
        { !doShowRelated || countOfRelated < 1 ? null : (
          <div class={style.relatedLink}>
            <Link href={`/related/${id}/${content}`}><span>{relatedText}</span><KeyboardDoubleArrowRightIcon /></Link>
          </div>
        )}
      </div>
    </div>
  );
}

const TextWithStrongs = ({ classes, verse, selectedWord }) => {
  const { type, data, reference, related, id, selected } = verse;
  return (
    <Link class={classes.join(' ')} href={`/v/${id}/${serialize(verse)}`}>
      <div class={style.tileReference}><ResponsiveReference reference={reference}/></div>
        <div class={style.tileText}>
          {data.map(segment => (
            <span class={segment.s === selectedWord ? style.selectedWord : ''}>{segment.t.trim()}&ensp;</span>
          ))}
        </div>
    </Link>
  );
}
  
const ResponsiveReference = ({ reference }) => {
  const referencePattern = /^(.*) (\d+:\d+)$/;
  try {
    const [ , book, verse] = reference.match(referencePattern);
    return (
      <span class={style.responsiveReference}>
        <span>{book}&nbsp;</span>
        <span>{verse}</span>
      </span>
    );
  } catch(e) {
    console.error(`Failed to parse reference. "${reference}" does not match ${referencePattern}. ${e}`);
    return reference;
  }
}

const VerseSegment = ({ segment, verseContent, selectedWord }) => {
  const classes = [style.verseSegment];
  if (selectedWord === segment.s) {
    classes.push(style.selectedWord);
  }
  return (
    <span class={style.verseSegmentContainer}>
      <Link class={classes.join(' ')} href={`/word/${segment.s}/${verseContent}`} title={segment.s}>{segment.t}</Link>
      &ensp;
    </span>
  );
}
