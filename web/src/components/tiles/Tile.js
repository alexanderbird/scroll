import { h } from 'preact';
import { useState } from 'preact/hooks';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkRemoveOutlinedIcon from '@mui/icons-material/BookmarkRemoveOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import IconButton from '@mui/material/IconButton';
import { useReadingList } from '../../hooks/useReadingList';
import Alert from '@mui/material/Alert';
import { Link } from 'preact-router/match';
import style from './style.css';
import { serialize } from '../../data-transformations/verse';

export const Tile = ({ selectedWord, verse, doShowRelated, actions }) => {
  const { type, data, reference, related, id, selected } = verse;
  const classes = [style.tile];
  if (verse.selected) {
    classes.push(style.tileSelected);
  }
  if (type === "TEXT_WITH_STRONGS") {
    return selected || verse.doExplodeVerseSegments
      ? <SelectedTextWithStrongs verse={verse} classes={classes} doShowRelated={doShowRelated} selectedWord={selectedWord} />
      : <TextWithStrongs verse={verse} classes={classes} selectedWord={selectedWord} actions={actions}/>
  }
  if (type === "ERROR") {
    return <Alert severity="error">{ data }</Alert>
  }
  if (type === "LINK") {
    return (
      <div class={[...classes, style.linkTile].join(' ')}>
        <Button href={data.href} fullWidth={true}>{data.text} <NorthEastIcon /></Button>
      </div>
    );
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
          In {contextVerse.reference}, "<em>{ contextVerse.data.filter(x => x.s === id)[0]?.t }</em>" is translated from the {language} word <em>{label.full}</em>
        </span>)
      : <span>The {language} word <em>{label.full}</em></span>;
    const relatedIds = new Set(related.split(','));
    const countOfRelated = related
      ? contextVerse ? relatedIds.size - 1 : relatedIds.size
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
          <p>{ countOfRelated === 1
            ? <span>There is <em>1 {contextVerse ? "other " : ""}verse</em> that includes</span>
            : <span>There are <em>{countOfRelated} {contextVerse ? "other " : ""}verses</em> that include</span>
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
      <span>Grammatical Notes: </span>
      <span>{upperCaseTransliteration} is </span>
      {derivationChunks.map(chunk => chunk.match(relatedWordIdsPattern)
        ? <Button href={`/word/${chunk}`} size="medium">{chunk} <NorthEastIcon /></Button>
        : <span>{chunk}</span>
      )}
    </p>
  );
}

const AddToReadingListButton = ({ verse }) => {
  const [, { isInReadingList, addToReadingList, removeFromReadingList }] = useReadingList();
  const thisVerseIsInTheReadingList = isInReadingList(verse);
  return (
    <div class={style.tileReferenceAddToReadingList}>
      <IconButton
        size="small"
        aria-label="add to reading list"
        onClick={() => thisVerseIsInTheReadingList ? removeFromReadingList(verse.id) : addToReadingList(verse)}
        color="inherit"
        >
        { thisVerseIsInTheReadingList
          ? <div class={style.tileReferenceAddToReadingListIcon}><BookmarkIcon /><BookmarkRemoveOutlinedIcon/></div>
          : <BookmarkAddOutlinedIcon />
        }
      </IconButton>
    </div>
   );
}

const ReadingListIcon = ({ verse }) => {
  const [, { isInReadingList }] = useReadingList();
  const thisVerseIsInTheReadingList = isInReadingList(verse);
  if (thisVerseIsInTheReadingList) {
    return <div class={style.readingListIcon}><BookmarkIcon fontSize="small"/></div>
  }
  return null;
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
      <div class={style.tileReference}>
        <AddToReadingListButton verse={verse}/>
        <ResponsiveReference reference={reference} />
      </div>
      <div class={childClasses.join(' ')}>
        <div>{ verseTextComponent }</div>
        { !doShowRelated || countOfRelated < 1 ? null : (
          <div class={style.relatedLink}>
            <Button href={`/related/${id}/${content}`}><span>{relatedText}</span><KeyboardDoubleArrowRightIcon /></Button>
          </div>
        )}
      </div>
    </div>
  );
}

const TextWithStrongs = ({ classes, verse, selectedWord, actions }) => {
  const { type, data, reference, related, id, selected } = verse;
  return (
    <div class={classes.join(' ')}>
      <Link class={style.tileReference} href={`/v/${id}/${serialize(verse)}`}>
        <ReadingListIcon verse={verse}/>
        <ResponsiveReference reference={reference}/>
      </Link>
      <Link class={style.tileText} href={`/v/${id}/${serialize(verse)}`}>
        {data.map(segment => (
          <span class={segment.s === selectedWord ? style.selectedWord : ''}>{segment.t.trim()} </span>
        ))}
      </Link>
      { actions ? <div class={style.tileActions}>{actions(id)}</div> : null }
    </div>
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
      <Link class={classes.join(' ')} href={`/word/${segment.s}/${verseContent}`} title={segment.s}>{segment.t.trim()}</Link>
      &ensp;
    </span>
  );
}
