import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { buildClient, defaultTimeProvider, wrapFetch } from 'scroll-api-sdk';
import style from './style.css';
import { Tiles } from '../../components/tiles';
import { Loading } from '../../components/loading';
import { deserialize } from '../../data-transformations/verse';

const Verse = ({ id, content }) => {
  const thisVerse = deserialize(content);
  const [ isLoadingPreviousVerses, setIsLoadingPreviousVerses ] = useState(true);
  const [ isLoadingNextVerses, setIsLoadingNextVerses ] = useState(true);
  const [ previousVerses, setPreviousVerses ] = useState([]);
  const [ nextVerses, setNextVerses ] = useState([]);
  const client = buildClient({ timeProvider: defaultTimeProvider, httpGet: wrapFetch(fetch), log: console.info });

  useEffect(async () => {
    setIsLoadingPreviousVerses(true);
    setPreviousVerses([]);
    const result = await client.getVersesInCanonicalOrder({
      pageSize: 5,
      direction: 'REVERSE',
      idPrefix: thisVerse.id.split('-').slice(0, 2).join('-'),
      startingId: thisVerse.id,
    });
    setIsLoadingPreviousVerses(false);
    setPreviousVerses(result.verses.reverse());
  }, [id]);

  useEffect(async () => {
    setIsLoadingNextVerses(true);
    setNextVerses([]);
    const result = await client.getVersesInCanonicalOrder({
      pageSize: 15,
      direction: 'FORWARD',
      idPrefix: thisVerse.id.split('-').slice(0, 2).join('-'),
      startingId: thisVerse.id,
    });
    setIsLoadingNextVerses(false);
    setNextVerses(result.verses);
  }, [id]);

  const verses = [...previousVerses, { selected: true, ...thisVerse }, ...nextVerses];

  return (
    <div class={style.verse}>
      { isLoadingPreviousVerses ? <Loading /> : null }
      <Tiles items={verses} />
      { isLoadingNextVerses ? <Loading /> : null }
    </div>
  );
}

export default Verse;
