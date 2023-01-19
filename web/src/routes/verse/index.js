import { h } from 'preact';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'preact/hooks';
import { buildClient, defaultTimeProvider, wrapFetch } from 'scroll-api-sdk';
import { reference } from 'scroll-core';
import style from './style.css';
import { PageHeader } from '../../components/pageHeader';
import { Tiles } from '../../components/tiles';
import { Loading } from '../../components/loading';
import { deserialize } from '../../data-transformations/verse';
import { LicenseSummary } from '../../components/license';

const Verse = ({ id, content }) => {
  const [ thisVerse, setThisVerse ] = useState(content ? deserialize(content) : null);
  const [ areThereMoreVerses, setAreThereMoreVerses ] = useState(false);
  const [ areThereMorePreviousVerses, setAreThereMorePreviousVerses ] = useState(false);
  const [ isLoadingPreviousVerses, setIsLoadingPreviousVerses ] = useState(true);
  const [ isLoadingNextVerses, setIsLoadingNextVerses ] = useState(true);
  const [ previousVerses, setPreviousVerses ] = useState([]);
  const [ nextVerses, setNextVerses ] = useState([]);
  const client = buildClient({ timeProvider: defaultTimeProvider, httpGet: wrapFetch(fetch), log: console.info });
  const thisVerseIsPresent = thisVerse && !thisVerse.isMissing;

  useEffect(async () => {
    if (thisVerse) return;
    const result = await client.getItem({ id, language: 'en', translation: 'webp', document: 'bible' });
    setThisVerse(result || { isMissing: true, type: 'ERROR', data: `Could not find ${reference(id)}` });
  }, [id, content]);

  useEffect(async () => {
    setIsLoadingPreviousVerses(true);
    setPreviousVerses([]);
    const result = await client.getVersesInCanonicalOrder({
      pageSize: 1,
      direction: 'REVERSE',
      idPrefix: id.split('-').slice(0, 2).join('-'),
      startingId: id,
    });
    setAreThereMorePreviousVerses(!!result.nextPage);
    setIsLoadingPreviousVerses(false);
    setPreviousVerses(result.verses.reverse());
  }, [id]);

  useEffect(async () => {
    setIsLoadingNextVerses(true);
    setNextVerses([]);
    const result = await client.getVersesInCanonicalOrder({
      pageSize: 15,
      direction: 'FORWARD',
      idPrefix: id.split('-').slice(0, 2).join('-'),
      startingId: id,
    });
    setAreThereMoreVerses(!!result.nextPage);
    setIsLoadingNextVerses(false);
    setNextVerses(result.verses);
  }, [id]);

  const addAnotherPage = async () => {
    if (isLoadingNextVerses) {
      return;
    }
    setIsLoadingNextVerses(true);
    const result = await client.getVersesInCanonicalOrder({
      pageSize: 15,
      direction: 'FORWARD',
      idPrefix: id.split('-').slice(0, 2).join('-'),
      startingId: nextVerses[nextVerses.length - 1].id,
    });
    setAreThereMoreVerses(!!result.nextPage);
    setIsLoadingNextVerses(false);
    setNextVerses(x => [...x, ...result.verses]);
  }

  const addAnotherPreviousPage = async () => {
    if (isLoadingNextVerses) {
      return;
    }
    setIsLoadingPreviousVerses(true);
    const result = await client.getVersesInCanonicalOrder({
      pageSize: 5,
      direction: 'REVERSE',
      idPrefix: id.split('-').slice(0, 2).join('-'),
      startingId: previousVerses[0].id,
    });
    setAreThereMorePreviousVerses(!!result.nextPage);
    setIsLoadingPreviousVerses(false);
    setPreviousVerses(x => [...result.verses.reverse(), ...x ]);
  }

  const verses = thisVerse
    ? [ ...previousVerses, { selected: true, ...thisVerse }, ...nextVerses ]
    : [ ...previousVerses, ...nextVerses ];
  return (
    <div class={style.verse}>
      <PageHeader>{ (thisVerseIsPresent ? thisVerse.reference : reference(id)).replace(/:.*$/, '') }</PageHeader>
      { !isLoadingPreviousVerses && areThereMorePreviousVerses ? (
        <div class={style.buttonBar}>
          <Button onClick={addAnotherPreviousPage}>
            <KeyboardDoubleArrowUpIcon />
          </Button>
        </div>
      ) : null }
      { (isLoadingPreviousVerses && thisVerseIsPresent) ? <Loading /> : null }
      <Tiles items={verses} doShowRelated={true}/>
      { isLoadingNextVerses ? <Loading /> : null }
      { !isLoadingNextVerses && areThereMoreVerses ? (
        <div class={style.buttonBar}>
          <Button onClick={addAnotherPage}><KeyboardDoubleArrowDownIcon/></Button>
        </div>
      ) : null }
      <LicenseSummary />
    </div>
  );
}

export default Verse;
