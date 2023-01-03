import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { buildClient, defaultTimeProvider, wrapFetch } from 'scroll-api-sdk';
import style from './style.css';
import { Tiles } from '../../components/tiles';
import { deserialize } from '../../data-transformations/verse';

const Verse = ({ id, content }) => {
  const thisVerse = deserialize(content);
  const [ previousVerses, setPreviousVerses ] = useState([]);
  const [ nextVerses, setNextVerses ] = useState([]);
  const client = buildClient({ timeProvider: defaultTimeProvider, httpGet: wrapFetch(fetch), log: console.info });

  useEffect(async () => {
    const result = await client.getVersesInCanonicalOrder({
      pageSize: 5,
      direction: 'REVERSE',
      idPrefix: thisVerse.id.split('-').slice(0, 2).join('-'),
      startingId: thisVerse.id,
    });
    setPreviousVerses(result.verses.reverse());
  }, [id]);

  useEffect(async () => {
    const result = await client.getVersesInCanonicalOrder({
      pageSize: 15,
      direction: 'FORWARD',
      idPrefix: thisVerse.id.split('-').slice(0, 2).join('-'),
      startingId: thisVerse.id,
    });
    setNextVerses(result.verses);
  }, [id]);

  const verses = [...previousVerses, { selected: true, ...thisVerse }, ...nextVerses];

  return (
    <div class={style.verse}>
      <Tiles items={verses} />
    </div>
  );
}

export default Verse;
