import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { buildClient, defaultTimeProvider, wrapFetch } from 'scroll-api-sdk';
import style from './style.css';
import { Tiles } from '../../components/tiles';
import { Loading } from '../../components/loading';
import { deserialize } from '../../data-transformations/verse';

const Verse = ({ id, content }) => {
  const thisVerse = deserialize(content);
  const [ areThereMoreVerses, setAreThereMoreVerses ] = useState(false);
  const [ areThereMorePreviousVerses, setAreThereMorePreviousVerses ] = useState(false);
  const [ isLoadingPreviousVerses, setIsLoadingPreviousVerses ] = useState(true);
  const [ isLoadingNextVerses, setIsLoadingNextVerses ] = useState(true);
  const [ previousVerses, setPreviousVerses ] = useState([]);
  const [ nextVerses, setNextVerses ] = useState([]);
  const client = buildClient({ timeProvider: defaultTimeProvider, httpGet: wrapFetch(fetch), log: console.info });

  useEffect(async () => {
    setIsLoadingPreviousVerses(true);
    setPreviousVerses([]);
    const result = await client.getVersesInCanonicalOrder({
      pageSize: 1,
      direction: 'REVERSE',
      idPrefix: thisVerse.id.split('-').slice(0, 2).join('-'),
      startingId: thisVerse.id,
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
      idPrefix: thisVerse.id.split('-').slice(0, 2).join('-'),
      startingId: thisVerse.id,
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
      idPrefix: thisVerse.id.split('-').slice(0, 2).join('-'),
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
      idPrefix: thisVerse.id.split('-').slice(0, 2).join('-'),
      startingId: previousVerses[0].id,
    });
    setAreThereMorePreviousVerses(!!result.nextPage);
    setIsLoadingPreviousVerses(false);
    setPreviousVerses(x => [...result.verses.reverse(), ...x ]);
  }

  const countOfRelated = thisVerse.related.split(",").filter(x => !!x).length;
  const relatedText = countOfRelated === 1
    ? "There is 1 other verse related to"
    : "There are " + countOfRelated + " other verses related to";

  const firstItems = [
    ...previousVerses,
    { selected: true, ...thisVerse },
  ]
  if (countOfRelated > 0) {
    firstItems.push({
      type: "LINK",
      data: { href: `/related/${thisVerse.id}/${content}`, text: relatedText + " " + thisVerse.reference + ". ➡" }
    });
  }
  const verses = [ ...firstItems, ...nextVerses ];

  return (
    <div class={style.verse}>
      <h3>{ thisVerse.reference.replace(/:.*$/, '')} </h3>
      { !isLoadingPreviousVerses && areThereMorePreviousVerses ? (
        <div class={style.buttonBar}>
          <button onClick={addAnotherPreviousPage}>⬆<br/>more</button>
        </div>
      ) : null }
      { isLoadingPreviousVerses ? <Loading /> : null }
      <Tiles items={verses} />
      { isLoadingNextVerses ? <Loading /> : null }
      { !isLoadingNextVerses && areThereMoreVerses ? (
        <div class={style.buttonBar}>
          <button onClick={addAnotherPage}>more<br/>⬇</button>
        </div>
      ) : null }
    </div>
  );
}

export default Verse;
